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
		console.log('USER DETAILS', this.state.userDetails);
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