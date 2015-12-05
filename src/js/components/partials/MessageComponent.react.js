import React from 'react';
import ReactDOM from 'react-dom';

var MessageComponent = React.createClass({
	getInitialState() {
		return {
			messages: [
				{
					type: "info",
					message: "Welcome!"
				}
			]
		};
	},
	componentWillReceiveProps(nextProps) {
		var self = this;

		// check if object is empty
		if (Object.keys(nextProps.message).length === 0) return;

		var messages = self.state.messages;
		messages.push(nextProps.message);
		self.setState(messages);
	},
	componentWillUpdate() {
		var node = ReactDOM.findDOMNode(this);
		this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
	},
	componentDidUpdate() {
		if (this.shouldScrollBottom) {
			var node = ReactDOM.findDOMNode(this);
			node.scrollTop = node.scrollHeight;
		}
	},
	render() {
		var self = this;
		var messageJSX = self.state.messages.map((item, index) => {
			if (item.type === "info") {
				return (
					<p key={index} className='info'>
						{item.message}
					</p>
				);
			} else if (item.type === "message") {
				return (
					<div key={index} className="messageWrapper">
						<div className="emitter" style={{backgroundImage: "url(/res/" + item.emitter + ".jpg)"}}></div>
						<div className="from-them">
							<p>{item.message}</p>
						</div>
						<div className="clearfix"></div>
					</div>
				);
			} else if (item.type === "myMessage") {
				return (
					<div key={index}>
						<div className="from-me">
							<p>{item.message}</p>
						</div>
						<div className="clearfix"></div>
					</div>
				);
			}
		});
		return (
			<div>
				{messageJSX}
			</div>
		);
	}
});

export default MessageComponent;