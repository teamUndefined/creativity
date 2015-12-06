import Dispatcher from '../dispatcher';
import Consts from '../constants/UserConstants';

class ServerActions {
	receivedProductList() {
		Dispatcher.isLoggedIn({
			actionType: Consts.IS_LOGGED_IN
		});
	}
}

export default new ServerActions();
