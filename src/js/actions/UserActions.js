import Dispatcher from '../dispatcher';
import Consts from '../constants/UserConstants';

class ServerActions {
	receivedProductList(products) {
		Dispatcher.handleServerAction({
			actionType: Consts.RECEIVED_PRODUCT_LIST,
			products: products
		});
	}
}

export default new ServerActions();
