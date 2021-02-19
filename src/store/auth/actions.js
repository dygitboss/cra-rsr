import {
  LOGIN, LOGOUT, REGISTER, AUTHORIZE, PROTECT_SESSION,
} from './types';

export const login = (email, password) => ({
  type: LOGIN,
  request: {
    method: 'POST',
    url: '/auth/login',
    data: {
      email, password,
    },
  },
});

export const signUp = (data) => ({
  type: REGISTER,
  request: {
    method: 'POST',
    url: '/auth/register',
    data,
  },
});

export const initSession = () => ({
  type: PROTECT_SESSION,
  request: {
    method: 'GET',
    url: '/csrf-cookie',
  },
});

// action creator which returns a functions thanks to redux-thunk
export const authorize = (email, password) => async (dispatch) => {
  await dispatch(initSession());
  return dispatch(login(email, password));
};

export const register = (data) => async (dispatch) => {
  await dispatch(initSession());
  return dispatch(signUp(data));
};

export const fetchAuthorizedUser = () => ({
  type: AUTHORIZE,
  request: {
    method: 'GET',
    url: '/user',
  },
});

export const logout = () => ({
  type: LOGOUT,
  request: {
    method: 'GET',
    url: '/logout',
  },
});
