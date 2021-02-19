import { FETCH_TODO, FETCH_TODOS } from './types';
import { composeQuery } from '../../utils';

/**
 * @param {PaginationQuery} query
 */
export const fetchTodos = (query = { page: 1, size: 10 }) => {
  const params = composeQuery(query);
  return {
    type: FETCH_TODOS,
    request: {
      method: 'GET',
      url: '/todos',
      params,
    },
  };
};

export const fetchTodo = (id) => ({
  type: FETCH_TODO,
  request: {
    method: 'GET',
    url: `/todos/${id}`,
  },
});
