import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App.react';
import Home from './components/routes/Home.react';
import Game from './components/routes/Game.react';
import Lobby from './components/routes/Lobby.react';

ReactDOM.render(
	<Router history={createBrowserHistory()}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="game/:_gid" component={Game} />
			<Route path="lobby/:_gid" component={Lobby} />
		</Route>
	</Router>,
	document.getElementById('mainContainer')
);