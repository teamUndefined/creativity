import React from 'react';

import {
	Paper,
	TextField
} from 'material-ui';

import MessageComponent from './MessageComponent.react';

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

		self.props.socket.on("new_client", function (client) {
			self.setState({
				newMessage: {
					type: "info",
					message: (client.name + " connected.")
				}
			});
		});

		self.props.socket.on("client_left", function (client) {
		    self.setState({
				newMessage: {
					type: "info",
					message: (client.name + " left.")
				}
			});
		});

		self.props.socket.on("total_clients", function (clients) {
			self.setState({
				clients: clients,
				newMessage: {}
			});
		});

		self.props.socket.on("new_message", function (data) {
			self.setState({
				newMessage: {
					type: "message",
					emitter: data.emitter,
					message: data.msg
				}
			});
		});

		self.props.socket.on("is_typing", function () {
			self.setState({
				isTyping: true,
				newMessage: {}
			})
		});

		self.props.socket.on("has_stopped_typing", function () {
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
		self.props.socket.emit("server_stopped_typing");
		self.props.socket.emit("server_message", message);
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
				self.props.socket.emit("server_typing");
			}
			clearTimeout(self.state.typingWait);
			self.setState({
				typingWait: (function (self) {
					return setTimeout(function () {
						self.props.socket.emit("server_stopped_typing");
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
				<div className="message-container col-sm-8">
					<MessageComponent message={self.state.newMessage} />
				</div>
				{ self.state.isTyping ? <i className="info isTyping">Someone is typing...</i> : null }
				<div className="pl-s pr-s">
					<TextField className="message-textarea" hintText="Type to chat" multiLine={true} maxRows={3} onKeyDown={self.isTyping} fullWidth={true} />
				</div>
			</div>
		);
	}
});

export default Chat;