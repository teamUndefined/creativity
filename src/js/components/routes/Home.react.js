import React from 'react';

import {
	Paper,
	RaisedButton
} from 'material-ui';

var Home = React.createClass({
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
							<RaisedButton label="Join Room" secondary={true} />
						</div>
					</div>
				</Paper>
			</div>
		);
	}
});

export default Home;