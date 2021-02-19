export const RESPONSE_OBJECT_STANDARD = {
  forbidden: false,
  found: false,
  serverError: false,
};

export const SINGLE_ENTITY_STATE_STANDARD = {
  data: {},
  loading: true,
  response: { ...RESPONSE_OBJECT_STANDARD },
};

export const ENTITY_STATE_STANDARD = {
  total: 0,
  data: [],
  loading: false,
  response: { ...RESPONSE_OBJECT_STANDARD },
};
