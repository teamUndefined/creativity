import events from 'events';
import Dispatcher from '../dispatcher.js';
import ActionConsts from '../constants/UserConstants';
import cookieParser from 'cookieparser';

var cartContent = {};
var visibility = false;

function addToCart(product) {
	cartContent[product.id] = product;
}

class UserStore extends events.EventEmitter {
	isLoggedIn() {
		var cookie = cookieParser.JSONCookie('login');

		return true;
	}
	getLoggedInUser() {
		console.log(cookieParser);
		// var cookie = cookieParser.JSONCookie('login');
	}
	getRoomUsers() {

	}
	emitChange() {
		this.emit('change');
	}
	addChangeListener(callback) {
		this.on('change', callback);
	}
}

var Store = new UserStore();

Dispatcher.register((payload) => {
	var action = payload.action;

	switch(action.actionType) {
		case ActionConsts.IS_LOGGED_IN:
			return isLoggedIn();
			break;
		default:
			return true;
	}

	Store.emitChange();
	return true;
});

export default Store;