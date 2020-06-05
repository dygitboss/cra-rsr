import axios from 'axios';
import { all } from 'redux-saga/effects';
import { handleRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

import config from '../config';

function onRequest(request) {
  // intercept a request here
  request.url = config.api.url + request.url;
  return request;
}

export const { requestsReducer, requestsSagas, requestsMiddleware } = handleRequests({
  driver: createDriver(axios),
  onRequest,
});

export default function* rootSaga() {
  yield all([...requestsSagas]);
}
