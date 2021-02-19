/**
 *
 * @typedef {Object} PaginationQuery
 * @property {Number} [page] Current page [1, .., n]
 * @property {Number} [size] Response rows limit [1, .., n]
 * @property {String} [mode] Response mode
 * @property {String} [searchTerm] Search term to filter result
 * @property {Boolean} [descending] Records order
 * @property {Object} [filters] Filters object
 *
 */

/**
 * @param {PaginationQuery} queryObj
 */
export function composeQuery(queryObj = { page: 1, size: 10 }) {
  const {
    page = 1, size = 10, mode, filters = [], sorting = [], pagination,
  } = queryObj;
  const query = { skip: (page * size) - size };
  if (size > -1) query.limit = size;
  if (mode) query.mode = mode;
  if (pagination) query.pagination = pagination;
  if (queryObj.with) query.with = queryObj.with;
  if (filters?.length) filters.forEach((filter) => { query[filter.name] = filter.value; });
  if (sorting?.length) {
    sorting.forEach((s) => {
      const order = s.order === 'ascend' ? '' : '-';
      query.sort_by = query.sort_by ? [...query.sort_by, `${order}${s.name}`] : [`${order}${s.name}`];
    });
  }
  return query;
}

/**
 * @param {Object[]} errors
 * @param {String=} replaceMessageWith
 */
export function parseErrors(errors, replaceMessageWith = null) {
  const erroredFields = Object.keys(errors);
  const fields = [];
  for (let i = 0; i < erroredFields.length; i += 1) {
    const namePath = erroredFields[i].split('.').map((part) => (Number.isNaN(+part) ? part : +part));
    fields.push({
      name: namePath,
      errors: replaceMessageWith || errors[erroredFields[i]],
    });
  }
  return fields;
}

export function applyFilter(data) {
  return data?.values ? data.values.map((item) => ({ text: item, value: item })) : false;
}

export function applySorter(data, sorterFn) {
  return data?.sort ? sorterFn || ((a, b) => a - b) : false;
}

/**
 * Map ant design Table filter object
 *
 * @param {Object} filters
 */
export function mapFilters(filters) {
  return Object.keys(filters).map((item) => ({ name: item, value: filters[item] }));
}

/**
 * Map ant design Table sorter object|array
 *
 * @param {Object|Array} sorting
 */
export function mapSorting(sorting) {
  const result = [];

  if (sorting.length) {
    for (let i = 0; i < sorting.length; i += 1) {
      if (sorting[i].order) result.push({ name: sorting[i].field, order: sorting[i].order });
    }
  } else if (sorting.order) {
    result.push({ name: sorting.field, order: sorting.order });
  }

  return result;
}
