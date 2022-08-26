//a function that combines objects
export function combineObj(a, b) {
  let result = [...a, ...b].sort((a, b) => b.popularity - a.popularity);
  return result;
}
