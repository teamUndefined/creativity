import React from 'react';

import Game from './routes/Game.react';

import {
	RaisedButton
} from 'material-ui';

var App = React.createClass({
	render() {
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
				{ this.props.children }
			</div>
		);
	}
});

export default App;