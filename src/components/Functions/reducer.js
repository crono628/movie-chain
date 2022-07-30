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
  radioMovie: true,
};

async function getDetailsAndCredits(choice, state) {
  const { radioMovie } = state;
  const { api, baseUrl, personCombinedCredits, movieCredits } = config;
  let dataDetails, dataCredits;
  try {
    const response = await fetch(
      `${baseUrl}${radioMovie ? 'movie' : 'person'}/${choice}?api_key=${api}`
    );
    const creditResponse = await fetch(
      `${baseUrl}${
        radioMovie ? movieCredits(choice) : personCombinedCredits(choice)
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
