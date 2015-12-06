import React from 'react';
import Canvas from './Canvas.react.js';
import Chat from '../partials/Chat.react';

import {
	Paper,
	TextField,
	Avatar,
	RaisedButton,
	CircularProgress,
	Checkbox
} from 'material-ui';

var Lobby = React.createClass({
	getInitialState() {
		return {
			players: [],
			isReady: false,
			allReady: false,
			matching: false
		};
	},
	componentDidMount() {
		var self = this;
		this.props.socket.on('err', function() {
			window.location = "/";
		});
		self.props.socket.on("total_clients", function (players) {
			self.setState({
				players: players
			});
		});
		self.props.socket.on("all_ready", function () {
			self.setState({
				allReady: true
			})
		});
		self.props.socket.on("match_made", function (gid) {
			window.location = "/game/" + gid;
		});
	},
	enableStrangers() {
		this.props.socket.emit("server_strangers_toggle");
	},
	setReady() {
		this.setState({
			isReady: true
		})
		this.props.socket.emit("server_user_ready", this.props.userDetails.facebook_uid);
	},
	startGame() {
		this.props.socket.emit("server_match_lobby");
		this.setState({
			matching: true
		});
	},
	render() {
		var self = this;
		return (
			<div className="mdl-grid">
				<div className="mdl-cell mdl-cell--1-col mdl-cell--0-col-phone"></div>
				<Paper zDepth={1} className="content-container mdl-cell mdl-cell--10-col mdl-cell--12-col-phone">
					<div className="mdl-grid">
						<div className="mdl-cell mdl-cell--4-col mdl-cell--12-col-phone chat-container">
							<Chat socket={this.props.socket} />
						</div>
						<div className="mdl-cell mdl-cell--8-col mdl-cell--12-col-phone p-m">
							<strong>Tell your friends to join:</strong>
							<br />
							<TextField defaultValue={window.location.href} fullWidth={true} />
							<div className="pt-m">
								{ self.state.players.map((item, index) => {
									return (
										<div key={index} className="pt-xs">
											<Avatar src={"https://graph.facebook.com/" + item.facebook_uid + "/picture"} />
											<strong className="pl-xs">{item.name}</strong>
										</div>
									);
								}) }
							</div>
							<div className="pt-m">
								<Checkbox name="public" value="public" label="Alow strangers" onClick={self.enableStrangers}/>
								{ !self.state.isReady ? (<RaisedButton ref="readyBtn" label="Ready" secondary={true} onClick={self.setReady}/>) : null}
								{ self.state.allReady ? (<RaisedButton ref="startBtn" label="Start" primary={true} onClick={self.startGame}/>) : null}
								{ self.state.matching ? (<CircularProgress mode="indeterminate" size={0.5} />) : null}
							</div>
						</div>
					</div>
				</Paper>
			</div>
		);
	}
});

export default Lobby;