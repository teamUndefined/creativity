import React from 'react';

import {
	Paper
} from 'material-ui';

var Chat = React.createClass({
	getInitialState() {
		return {
			clients: [],
			newMessage: {},
			isTyping: false,
			typingWait: null
		};
	},
	componentDidMount() {
		var self = this;
		self.socket = io();

		self.socket.on("new_client", function (client) {
			self.setState({
				newMessage: {
					type: "info",
					message: (client + " connected.")
				}
			});
		});

		self.socket.on("client_left", function (client) {
		    self.setState({
				newMessage: {
					type: "info",
					message: (client + " left.")
				}
			});
		});

		self.socket.on("total_clients", function (clients) {
			self.setState({
				clients: clients,
				newMessage: {}
			});
		});

		self.socket.on("new_message", function (data) {
			self.setState({
				newMessage: {
					type: "message",
					emitter: data.emitter,
					message: data.msg
				}
			});
		});

		self.socket.on("is_typing", function () {
			self.setState({
				isTyping: true,
				newMessage: {}
			})
		});

		self.socket.on("has_stopped_typing", function () {
			self.setState({
				isTyping: false,
				newMessage: {}
			})
		});
	},
	sendMessage(textarea) {
		// get message from textarea
		var message = textarea.value;
		// if there's no message don't do shit
		if (!message) return;

		var self = this;
		// empty textarea
		textarea.value = "";
		// emit message to server(others)
		self.socket.emit("stopped_typing");
		self.socket.emit("message", message);
		self.setState({
			newMessage: {
				type: "myMessage",
				message: message
			}
		});
	},
	isTyping(e) {
		var self = this;
		if (e.keyCode === 13) {
			e.preventDefault();
			self.sendMessage(e.target);
		} else {
			if (self.state.isTyping === false) {
				self.socket.emit("typing");
			}
			clearTimeout(self.state.typingWait);
			self.setState({
				typingWait: (function (self) {
					return setTimeout(function () {
						self.socket.emit("stopped_typing");
					}, 3000);
				})(self),
				newMessage: {}
			});
		}
	},
	render() {
		var self = this;
		return (
			<div>
				<div className="well message-container col-sm-8">
					<MessageComponent message={self.state.newMessage} />
				</div>
				{ self.state.isTyping ? <i className="info isTyping">Someone is typing...</i> : null }
				<textarea className="message-textarea" placeholder="Type to chat..." onKeyDown={self.isTyping}></textarea>
			</div>
		);
	}
});

export default Chat;