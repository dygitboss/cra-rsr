import { entitySelector, singleEntitySelector } from '../selectors';

const ENTITY = 'todos';

export const todosSelector = (state) => entitySelector(ENTITY)(state);

export const todoSelector = (state) => singleEntitySelector(ENTITY)(state);
