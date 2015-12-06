import React from 'react';

import Game from './routes/Game.react';

import UserStore from '../stores/UserStore';

import {
	RaisedButton
} from 'material-ui';

var App = React.createClass({
	getInitialState() {
		return {
			socket: io(),
			loggedIn: UserStore.isLoggedIn(),
			userDetails: UserStore.getLoggedInUser()
		};
	},
	componentDidMount() {
		// Notie init
		var alert_color_success_background = '#2ecc71';
		var alert_color_warning_background = '#E3B771';
		var alert_color_error_background = '#c0392b';
		var alert_color_info_background = '#fafafa';
		var alert_color_text = '#FFF';
	},
	render() {
		var self = this;
		return (
			<div className="app-container">
				<div className="login-wrapper">
					{
						!this.state.loggedIn ?
						(
							<a href="/@/auth/facebook">
								<RaisedButton primary={true} label="Login" labelPosition="after">
									<i className="fa fa-facebook"></i>
								</RaisedButton>
							</a>
						) :  (
							<span>Hi, <span className="user-name">{this.state.userDetails.name}</span>!</span>
						)
					}
				</div>
				<img src="/res/logo.svg" className="logo" />
				{ self.props.children && React.cloneElement(self.props.children, {
					socket: self.state.socket,
					userDetails: self.state.userDetails
				})}
			</div>
		);
	}
});

export default App;