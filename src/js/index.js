import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App.react';
import Home from './components/routes/Home.react';
import Game from './components/routes/Game.react';
import Lobby from './components/routes/Lobby.react';

import UserStore from './stores/UserStore.js';

function authCheck(nextState, replaceState) {
	if (!UserStore.isLoggedIn()) {
		replaceState({nextPathname: nextState.location.pathname}, '/')
	}
}

ReactDOM.render(
	<Router history={createBrowserHistory()}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="game/:_gid" component={Game} onEnter={authCheck}/>
			<Route path="lobby/:_gid" component={Lobby} onEnter={authCheck}/>
		</Route>
	</Router>,
	document.getElementById('mainContainer')
);