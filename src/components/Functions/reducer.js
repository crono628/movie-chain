import config from '../../config';

function reducer(state, { type, payload }) {
  switch (type) {
    case 'init_stored': {
      return { ...payload.value };
    }
    case 'update': {
      return { ...state, [payload.key]: payload.value };
    }
    case 'clear': {
      return { ...initialState };
    }
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}

const initialState = {
  searchMovieQueries: null,
  searchPersonQueries: null,
  personDetails: null,
  personCredits: null,
  movieCast: null,
  movieDetails: null,
  radioMovie: true,
  loading: true,
  page: 1,
};

export { reducer, initialState };
