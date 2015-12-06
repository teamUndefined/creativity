import React from 'react';
import Canvas from './Canvas.react.js';
import Chat from '../partials/Chat.react';
import UserStore from '../../stores/UserStore';

import {
	Paper,
	Avatar
} from 'material-ui';

var Game = React.createClass({
	componentDidMount() {
		this.props.socket.on('err', function() {
			window.location = "/";
		});

		notie.alert(2, 'Welcome to the room!', 3);
	},
	render() {
		return (
			<div className="mdl-grid  mb-l">
				<div className="mdl-cell mdl-cell--1-col mdl-cell--0-col-phone"></div>
				<Paper zDepth={1} className="content-container mdl-cell mdl-cell--10-col mdl-cell--12-col-phone">
					<div className="mdl-grid">
						<div className="mdl-cell mdl-cell--12-col team-container">
							<div className="mdl-grid">
								<div className="mdl-cell mdl-cell--6-col us-players text-center ">
									<Avatar src={"https://graph.facebook.com/" + this.props.userDetails.facebook_uid + "/picture"} />
								</div>
								<div className="mdl-cell mdl-cell--6-col them-players text-center ">
									
								</div>
							</div>
						</div>
						<div className="mdl-cell mdl-cell--4-col mdl-cell--12-col-phone chat-container">
							<Chat socket={this.props.socket} />
						</div>
						<div className="mdl-cell mdl-cell--8-col mdl-cell--12-col-phone canvas-section">
							<Canvas socket={this.props.socket} />
						</div>
					</div>
				</Paper>
			</div>
		);
	}
});

export default Game;