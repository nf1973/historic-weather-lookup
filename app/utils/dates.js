export const daysInMonth = (m) => {
  const month30Days = [4, 6, 9, 11]; // April, June, September, November
  if (month30Days.includes(parseInt(m, 10))) {
    return 30;
  } else if (parseInt(m, 10) === 2) {
    // February
    return 29;
  } else {
    return 31;
  }
};
