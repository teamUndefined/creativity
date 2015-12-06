import events from 'events';
import Dispatcher from '../dispatcher.js';
import ActionConsts from '../constants/ActionConstants';

var cartContent = {};
var visibility = false;

function addToCart(product) {
	cartContent[product.id] = product;
}

class UserStore extends events.EventEmitter {
	isLoggedIn() {
		return total;
	}
	getLoggedInUser() {
		
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
		case ActionConsts.ADD_TO_CART:
			addToCart(action.product);
			break;
		case ActionConsts.REMOVE_FROM_CART:
			removeFromCart(action.id);
			break;
		case ActionConsts.UPDATE_CART_VISIBILITY:
			updateCartVisibility(action.visible);
			break;
		default:
			return true;
	}

	Store.emitChange();
	return true;
});

export default Store;
