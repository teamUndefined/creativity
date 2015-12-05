import React from 'react';

import Game from './routes/Game.react';

var App = React.createClass({
	render() {
		return (
			<div className="app-container">
				<img src="/res/logo.svg" className="logo" />
				{ this.props.children }
			</div>
		);
	}
});

export default App;