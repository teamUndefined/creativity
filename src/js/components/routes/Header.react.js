import React from 'react';
import {
	Link
} from 'react-router';

import {
	Col,
	Row,
	Grid
} from 'react-bootstrap';

var Header = React.createClass({
	render() {

		const {
			active,
			headerStyle
		} = this.props;

		return (
			<Col xs={12} className={"header" + (headerStyle ? " " + headerStyle : "")}>
				<Link to="/">
					<img src={headerStyle ? "/res/logo-" + headerStyle + ".png" : "/res/logo-white.png"} className="headerLogo" />
				</Link>
				<div className="headerAuthWrapper pull-right">
					<Link to="/register" className={"bidon-btn " + (headerStyle ? "bidon-btn-" + headerStyle : "bidon-btn-white") + " mr-xs" + (active === "register" ? " active" : "")}>Register</Link>
					<Link to="/login" className={"bidon-btn " + (headerStyle ? "bidon-btn-" + headerStyle : "bidon-btn-white") + (active === "login" ? " active" : "")}>Login</Link>
				</div>
			</Col>
		);
	}
});

export default Header;