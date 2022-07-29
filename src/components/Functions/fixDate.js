//year-month-day to month/day/year
export const fixDate = (date) => {
  const dateArray = date.split('-');
  return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
};
