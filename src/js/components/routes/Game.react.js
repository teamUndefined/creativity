import React from 'react';

import {
	Paper
} from 'material-ui';

var Game = React.createClass({
	componentDidMount() {
		
	},
	render() {
		return (
			<div className="mdl-grid">
				<div className="mdl-cell mdl-cell--1-col mdl-cell--0-col-phone"></div>
				<Paper zDepth={1} className="content-container mdl-cell mdl-cell--10-col mdl-cell--12-col-phone">
					<div className="mdl-grid">
						<div className="mdl-cell mdl-cell--4-col mdl-cell--0-col-phone">
							Hello
						</div>
						<div className="mdl-cell mdl-cell--8-col mdl-cell--12-col-phone">
							World
						</div>
					</div>
				</Paper>
			</div>
		);
	}
});

export default Game;