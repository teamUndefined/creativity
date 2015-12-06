import Dispatcher from '../dispatcher';
import Consts from '../constants/UserConstants';

class ServerActions {
	isLoggedIn() {
		Dispatcher.handleViewAction({
			actionType: Consts.IS_LOGGED_IN
		});
	},
	getLoggedInUser() {
		Dispatcher.handleViewAction({
			actionType: Consts.GET_LOGGED_IN_USER
		});
	}
}

export default new ServerActions();
