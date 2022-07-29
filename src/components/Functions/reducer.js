import config from '../../config';

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

async function getDetailsAndCredits(choice, state) {
  const { movie } = state.radio;
  const { api, baseUrl, personCombinedCredits, movieCredits } = config;
  let dataDetails, dataCredits;
  try {
    const response = await fetch(
      `${baseUrl}${movie ? 'movie' : 'person'}/${choice}?api_key=${api}`
    );
    const creditResponse = await fetch(
      `${baseUrl}${
        movie ? movieCredits(choice) : personCombinedCredits(choice)
      }?api_key=${api}`
    );
    const data = await response.json();
    const creditData = await creditResponse.json();
    dataDetails = data;
    dataCredits = creditData;
  } catch (error) {
    console.log(error);
  }
  return { dataDetails, dataCredits };
}

export { reducer, initialState, getDetailsAndCredits };
