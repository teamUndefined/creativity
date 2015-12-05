import React from 'react';

import {
	Grid,
	Row
} from 'react-bootstrap';

import Game from './routes/Game.react';

var App = React.createClass({
	render() {
		return (
			<Grid fluid={true}>
				<Row>
					{ this.props.children }
				</Row>
			</Grid>
		);
	}
});

export default App;