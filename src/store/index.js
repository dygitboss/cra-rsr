import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { middleware as sagaThunkMiddleware } from 'redux-saga-thunk';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import saga, { requestsReducer, requestsMiddleware } from './saga';
import auth from './auth/reducer';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  requests: requestsReducer, auth,
});

const middlewares = [
  ...requestsMiddleware,
  thunk,
  sagaThunkMiddleware,
  sagaMiddleware,
];

// Disable Logger at server side.
// eslint-disable-next-line no-undef
if (process.browser && process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware);
}

const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(() => saga(store.dispatch, store.getState));

export default store;
