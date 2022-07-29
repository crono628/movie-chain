function reducer(state, { type, payload }) {
  switch (type) {
    case 'update':
      return { ...state, [payload.key]: payload.value };
    case 'clear':
      return { ...initialState };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}

const initialState = {
  queries: null,
  details: null,
  credits: null,
  loading: false,
  page: 1,
  radio: { movie: true, person: false },
};

export { reducer, initialState };
