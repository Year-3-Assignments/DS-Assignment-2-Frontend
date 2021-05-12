import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import allReducers from './reducers/index';
import { createLogger } from 'redux-logger';

// production Store
const Store = createStore(allReducers, applyMiddleware(promise));

// development Store
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// const Store = createStore(allReducers, composeEnhancers(
//     applyMiddleware(promise))
// );
export default Store;
