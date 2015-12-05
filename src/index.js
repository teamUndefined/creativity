import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App.react';
import Home from './components/routes/Home.react';
import Register from './components/routes/Register.react';
import Login from './components/routes/Login.react';
import Product from './components/routes/Product.react';

ReactDOM.render(
	<Router history={createBrowserHistory()}>
		<Route path="/" component={Home}>
			<Route path="register" component={Register}/>
			<Route path="login" component={Login}/>
		</Route>
		<Route path="/product/:productId" component={Product} />
	</Router>,
	document.getElementById('mainContainer')
);