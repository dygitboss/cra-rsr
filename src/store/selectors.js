/**
 * @param {String} entityName
 * @param {?String=} subState
 */
export const entitySelector = (entityName, subState = null) => (state) => {
  const route = subState ? state[entityName][subState] : state[entityName];
  return [
    route.data,
    route.total,
    route.loading,
    route.response,
  ];
};

/**
 * @param {String} entityName
 * @param {String=} field
 */
export const singleEntitySelector = (entityName, field = 'item') => (state) => [
  state[entityName][field].data,
  state[entityName][field].loading,
  state[entityName][field].response,
];
