import React from 'react';
import Header from './Header.react';

import {
	Link
} from 'react-router';

import {
	Row,
	Col
} from 'react-bootstrap';

var Login = React.createClass({
	componentDidMount() {

	},
	render() {
		return (
			<div className="fullscreen-popin">
				<Header headerStyle="inverted" active="login" />
				<div className="fullscreen-popin-content-wrapper">
					<Link to="/" className="icon-close" />
					<div className="fullscreen-popin-box">
						<img src="/res/login_mockup.png" className="wide" />
					</div>
					<div className="fullscreen-popin-box">
						<h3>Welcome back!</h3>
						<p>
							Lorem ipsum dolor sit amet, in nihil nullam euripidis vim. Tale comprehensam te eos. Case probo officiis ut eam, solet bonorum usu no. Aliquam assentior usu et. Commodo molestie assueverit vel ne, imperdiet efficiantur quo ei. Modo labitur cotidieque eam ex.
						</p>
						<div className="form-group">
							<label>Email</label>
							<input type="text" className="bidon-input" />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="bidon-input" />
						</div>
						<div className="form-group">
							<div className="bidon-btn bidon-btn-inverted">Login</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default Login;