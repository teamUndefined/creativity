import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App.react';
import Home from './components/routes/Home.react';
import Game from './components/routes/Game.react';

ReactDOM.render(
	<Router history={createBrowserHistory()}>
		<Route path="/" component={App}>
			<Route path="game/:_gid" component={Game} />
		</Route>
	</Router>,
	document.getElementById('mainContainer')
);