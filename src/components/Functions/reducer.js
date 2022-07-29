function reducer(state, { type, payload }) {
  switch (type) {
    case 'update':
      return { ...state, [payload.key]: payload.value };

    // case 'queries':
    //   return { ...state, queries: payload };
    // case 'details':
    //   return { ...state, details: payload };
    // case 'movie_credits':
    //   return { ...state, movie_credits: payload };
    // case ' loading':
    //   return { ...state, loading: payload };
    // case 'radio':
    //   return { ...state, radio: payload };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}

const initialState = {
  queries: null,
  details: null,
  movie_credits: null,
  loading: false,
  radio: { movie: true, person: false },
};

export { reducer, initialState };
