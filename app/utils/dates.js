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

export const getFirstAndLastYear = (data) => {
  if (data.length === 0) {
    return [null, null];
  }

  const years = data.map((day) => day.daily.time.toString().slice(0, 4));
  const firstYear = Math.min(...years);
  const lastYear = Math.max(...years);

  return [firstYear, lastYear];
};

export const formatDate = (day, month) => {
  // Create a new Date object with the provided day and month (subtract 1 from month because it's zero-based)
  const date = new Date(2000, month - 1, day);

  // Get the day, month, and year components from the date
  const formattedDay = date.getDate();
  const formattedMonth = date.toLocaleString("default", { month: "long" });

  // Add suffix to day
  const suffixes = ["th", "st", "nd", "rd"];
  const suffixIndex =
    formattedDay % 10 < 4 && (formattedDay % 100) - (formattedDay % 10) !== 10
      ? formattedDay % 10
      : 0;
  const formattedDate = `${formattedDay}${suffixes[suffixIndex]} ${formattedMonth}`;

  return formattedDate;
};
