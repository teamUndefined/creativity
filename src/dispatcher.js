import Flux from 'flux';

class Dispatcher extends Flux.Dispatcher {
    handleServerAction(action) {
        this.dispatch({
            source: 'SERVER_ACTION',
            action: action
        });
    }
    handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
}

export default new Dispatcher();