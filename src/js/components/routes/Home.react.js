import React from 'react';

import {
	Paper,
	RaisedButton,
	CircularProgress
} from 'material-ui';

var Home = React.createClass({
	getInitialState() {
		return {
			search: false
		}
	},
	componentDidMount() {

		this.props.socket.on("lobby_found", function(lobbyPath) {
			window.location = lobbyPath;
		});

		this.props.socket.on("lobby_not_found", function() {
			notie.alert(3, 'Sorry, We didn\'t fund any rooms!', 3);
			this.setState({
				search: false
			});
		});

	},
	findRoom() {
		this.props.socket.emit("server_join_lobby");
		this.setState({
			search: true
		});
	},
	render() {
		return (
			<div className="mdl-grid home">
				<div className="mdl-cell mdl-cell--1-col mdl-cell--0-col-phone"></div>
				<Paper zDepth={1} className="content-container mdl-cell mdl-cell--10-col mdl-cell--12-col-phone">
					<div className="mdl-grid">
						<div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-phone p-xl text-center">
							<a href="/@/createLobby">
								<RaisedButton label="Create Room" primary={true} />
							</a>
						</div>
						<div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-phone p-xl text-center">
							<RaisedButton label="Join Room" secondary={true} onClick={this.findRoom} />
							{ this.state.search ? (<CircularProgress mode="indeterminate" size={0.5} />) : null}
						</div>
					</div>
				</Paper>
			</div>
		);
	}
});

export default Home;