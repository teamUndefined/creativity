import React from 'react';
import Canvas from './Canvas.react.js';
import Chat from '../partials/Chat.react';

import {
	Paper
} from 'material-ui';

var Game = React.createClass({
	getInitialState() {
		return {
			socket: io()
		};
	},
	render() {
		return (
			<div className="mdl-grid">
				<div className="mdl-cell mdl-cell--1-col mdl-cell--0-col-phone"></div>
				<Paper zDepth={1} className="content-container mdl-cell mdl-cell--10-col mdl-cell--12-col-phone">
					<div className="mdl-grid">
						<div className="mdl-cell mdl-cell--4-col mdl-cell--12-col-phone chat-container">
							<Chat socket={this.state.socket} />
						</div>
						<div className="mdl-cell mdl-cell--8-col mdl-cell--12-col-phone">
							<Canvas socket={this.state.socket} />
						</div>
					</div>
				</Paper>
			</div>
		);
	}
});

export default Game;