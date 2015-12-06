import React from 'react';

import Game from './routes/Game.react';

import {
	RaisedButton
} from 'material-ui';

var App = React.createClass({
	getInitialState() {
		return {
			socket: io()
		};
	},
	render() {
		var self = this;
		return (
			<div className="app-container">
				<div className="login-wrapper">
					<a href="/@/auth/facebook">
						<RaisedButton primary={true} label="Login" labelPosition="after">
							<i className="fa fa-facebook"></i>
						</RaisedButton>
					</a>
				</div>
				<img src="/res/logo.svg" className="logo" />
				{ self.props.children && React.cloneElement(self.props.children, {
					socket: self.state.socket
				})}
			</div>
		);
	}
});

export default App;