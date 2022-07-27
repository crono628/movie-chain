export function filterQuery(arr, num) {
  const newArr = [...arr];
  let filtered = newArr.filter((item) => item.id === num);
  return filtered[0];
}
