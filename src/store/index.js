import axios from 'axios';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';

import config from 'config';
import ROUTES from 'config/routes';
import history from 'config/history';
import auth from './auth/reducer';
import todos from './todos/reducer';

export const instance = axios.create({
  baseURL: config.api.url,
  withCredentials: true,
});

const { requestsReducer: requests, requestsMiddleware } = handleRequests({
  driver: createDriver(instance),
  onError: async (e) => {
    if (e.response && e.response.status === 401) {
      history.replace(ROUTES.LOGIN);
    }
    throw e;
  },
});

const rootReducer = combineReducers({
  auth,
  todos,
  requests,
});

const middlewares = [
  ...requestsMiddleware,
  thunk,
];

if (config.general.logging) middlewares.push(createLogger());

export const storeBuilder = (initState) => createStore(
  rootReducer,
  initState,
  config.general.logging ? composeWithDevTools(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares),
);

export default storeBuilder();
