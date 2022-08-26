import config from '../../config';

async function getMovieQueries(searchValue, page) {
  let data = [];
  const { searchMovie, api, sortBy, baseUrl } = config;
  try {
    const response = await fetch(
      `${baseUrl}${searchMovie}?api_key=${api}&query=${searchValue}&page=${page}&sort_by=${sortBy}`
    );
    const responseData = await response.json();
    data = responseData.results;
  } catch (error) {
    console.log(error);
  }
  return data;
}

async function getPersonQueries(searchValue, page) {
  let data = [];
  const { searchPerson, api, sortBy, baseUrl } = config;
  try {
    const response = await fetch(
      `${baseUrl}${searchPerson}?api_key=${api}&query=${searchValue}&page=${page}&sort_by=${sortBy}`
    );
    const responseData = await response.json();
    data = responseData.results;
  } catch (error) {
    console.log(error);
  }
  return data;
}

async function getWithPeople(choice) {
  let data = [];
  const { withPeople } = config;
  try {
    const response = await fetch(withPeople(choice));
    const responseData = await response.json();
    data = responseData.results;
  } catch (error) {
    console.log(error);
  }
  return data;
}

export { getMovieQueries, getPersonQueries, getWithPeople };
