import { error, success } from '@redux-requests/core';
import { ENTITY_STATE_STANDARD, SINGLE_ENTITY_STATE_STANDARD } from '../../config/constants';
import { FETCH_TODOS, FETCH_TODO } from './types';
import {
  mapPaginationResponse, mapSingleEntityResponse, mutateState, mapError,
} from '../mutations';

const initialState = {
  ...ENTITY_STATE_STANDARD,
  item: { ...SINGLE_ENTITY_STATE_STANDARD },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return mutateState(state, action, { loading: true });
    case FETCH_TODO:
      return mutateState(state, action, { loading: true }, 'item');

    case success(FETCH_TODOS):
      return mapPaginationResponse(state, action);
    case success(FETCH_TODO):
      return mapSingleEntityResponse(state, action);

    case error(FETCH_TODOS):
      return mapError(state, action);
    case error(FETCH_TODO):
      return mapError(state, action, 'item');

    default: return state;
  }
};

export default reducer;
