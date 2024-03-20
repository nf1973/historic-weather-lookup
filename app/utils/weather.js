// Function to calculate the average of an array
export const calculateAverage = (array) => {
  if (array.length === 0) return 0;
  const sum = array.reduce((acc, curr) => acc + curr, 0);
  return sum / array.length;
};

// Function to find the maximum value in an array
export const findMax = (array) => {
  return array.length > 0 ? Math.max(...array) : 0;
};

// Function to find the minimum value in an array
export const findMin = (array) => {
  return array.length > 0 ? Math.min(...array) : 0;
};

// Function to count occurrences of an item in an array
export const countOccurrences = (array, item) => {
  return array.filter((value) => value === item).length;
};

// Function to find the most frequent item in an array and its percentage
export const findMostFrequentItem = (array) => {
  if (array.length === 0) return { item: null, percentage: 0 };
  const frequencies = {};
  array.forEach((item) => {
    frequencies[item] = (frequencies[item] || 0) + 1;
  });
  const mostFrequentItem = Object.keys(frequencies).reduce((a, b) =>
    frequencies[a] > frequencies[b] ? a : b
  );
  const percentage = (frequencies[mostFrequentItem] / array.length) * 100;
  return { item: mostFrequentItem, percentage };
};
// Function to count occurrences of nice weather conditions
export const countNiceDays = (array) => {
  const niceConditions = ["Clear", "Mostly Clear", "Partly Cloudy"];
  const niceDays = array.filter((day) => {
    const isNice = niceConditions.includes(
      day.daily.weather_code_description.trim()
    );
    return isNice;
  });
  return niceDays.length;
};
