import events from 'events';
import Dispatcher from '../dispatcher.js';
import ActionConsts from '../constants/UserConstants';
import cookieParser from 'cookie';

var _loginInfo = {};
var visibility = false;

function addToCart(product) {
	cartContent[product.id] = product;
}

class UserStore extends events.EventEmitter {
	isLoggedIn() {
		console.log(cookieParser);
		var cookie,
			loginInfo;
		if (document.cookie) {
          cookie = cookieParser.parse(document.cookie);
      }

		if (cookie && cookie.login) {
          if (cookie.login.indexOf("{") !== -1 && cookie.login.indexOf("}") !== -1) {
              var loginString = cookie.login.slice(cookie.login.indexOf("{"), cookie.login.indexOf("}") + 1);

              try {
                  loginInfo = JSON.parse(loginString);
              } catch (e) {
                  console.error(e, "faild to parse login cookie");
              }
          }
      }

      if (loginInfo) {
			return true;
      }

      return false;
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