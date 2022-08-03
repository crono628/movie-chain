//filter cast by popularity
export const filterCastPopularity = (cast, num) => {
  return cast
    .filter((actor) => actor.popularity >= num)
    .sort((a, b) => b.popularity - a.popularity);
};
