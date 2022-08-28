import config from '../../config';

async function getPersonDetailsCredits(choice) {
  const { api, baseUrl, personCombinedCredits } = config;
  let dataDetails, dataCredits;
  try {
    const response = await fetch(`${baseUrl}person/${choice}?api_key=${api}`);
    const creditResponse = await fetch(
      `${baseUrl}${personCombinedCredits(choice)}?api_key=${api}`
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

async function getPersonCredits(choice) {
  const { api, baseUrl, personMovieCredits } = config;
  let dataCredits;
  try {
    const creditResponse = await fetch(personMovieCredits(choice));
    const creditData = await creditResponse.json();
    dataCredits = creditData;
  } catch (error) {
    console.log(error);
  }
  return dataCredits;
}

async function getMovieDetailsCredits(choice) {
  const { api, baseUrl, movieCredits } = config;
  let dataDetails, dataCredits;
  try {
    const response = await fetch(`${baseUrl}movie/${choice}?api_key=${api}`);
    const creditResponse = await fetch(
      `${baseUrl}${movieCredits(choice)}?api_key=${api}`
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

export { getPersonCredits, getPersonDetailsCredits, getMovieDetailsCredits };
