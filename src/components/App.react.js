import React from 'react';

import {
	Grid,
	Row
} from 'react-bootstrap';

import Header from './routes/Header.react';

var App = React.createClass({
	render() {
		return (
			<Grid fluid={true}>
				<Row>
					<Header />
					{ this.props.children }
				</Row>
			</Grid>
		);
	}
});

export default App;