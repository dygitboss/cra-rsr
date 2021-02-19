import { error, success } from '@redux-requests/core';
import {
  AUTHORIZE, LOGIN, REGISTER, LOGOUT,
} from './types';

const initialState = {
  user: null,
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
    case AUTHORIZE:
      return { ...state, loading: true };

    case success(LOGOUT):
      return { ...initialState };

    case success(REGISTER):
    case success(LOGIN):
      return {
        ...state, user: action.response.data.user, loading: false,
      };

    case success(AUTHORIZE):
      return { ...state, user: action.response.data, loading: false };

    case error(LOGIN):
    case error(REGISTER):
    case error(AUTHORIZE):
      return {
        ...state, loading: false,
      };

    default: return state;
  }
};

export default reducer;
