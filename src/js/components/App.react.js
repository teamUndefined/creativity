import React from 'react';

import Game from './routes/Game.react';

var App = React.createClass({
	render() {
		return (
			<div className="app-container">
				<div className="login-wrapper">
					<a href="/@/auth/facebook">
						<i className="fa fa-facebook"></i>
						Login
					</a>
				</div>
				<img src="/res/logo.svg" className="logo" />
				{ this.props.children }
			</div>
		);
	}
});

export default App;