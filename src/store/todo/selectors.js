import { entitySelector, singleEntitySelector } from '../selectors';

const ENTITY = 'todo';

export const todosSelector = (state) => entitySelector(ENTITY)(state);

export const todoSelector = (state) => singleEntitySelector(ENTITY)(state);
