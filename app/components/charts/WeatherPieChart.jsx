import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from "recharts";

const WeatherPieChart = ({ weatherData }) => {
  // Define colors for nice days (green shades) and other days (blue shades)
  const niceDayColors = ["#80BEA8", "#5B927F", "#2D632C"];
  const otherDayColors = [
    "#3A5489",
    "#4362A0",
    "#4D70B7",
    "#577ECE",
    "#618DE5",
    "#7098E7",
    "#80A3EA",
    "#90AFEC",
    "#A0BAEF",
  ];

  // Function to check if a description represents a nice day
  const isNiceDay = (description) => {
    return (
      description === "Clear" ||
      description === "Mostly Clear" ||
      description === "Partly Cloudy"
    );
  };

  // Count occurrences of each weather description
  const weatherDescriptionCounts = {};
  weatherData.forEach((entry) => {
    const description = entry.daily.weather_code_description;
    if (weatherDescriptionCounts[description]) {
      weatherDescriptionCounts[description]++;
    } else {
      weatherDescriptionCounts[description] = 1;
    }
  });

  // Convert the counts to an array of objects with colors based on description type
  let weatherDescriptionData = Object.keys(weatherDescriptionCounts).map(
    (description, index) => ({
      name: description,
      value: weatherDescriptionCounts[description],
      fill: isNiceDay(description)
        ? niceDayColors[index % niceDayColors.length]
        : otherDayColors[index % otherDayColors.length],
    })
  );

  // Sort the weather description data so that nice days are together
  weatherDescriptionData = weatherDescriptionData.sort((a, b) => {
    const isNiceDayA = isNiceDay(a.name) ? 1 : 0;
    const isNiceDayB = isNiceDay(b.name) ? 1 : 0;
    return isNiceDayB - isNiceDayA;
  });

  return (
    <ResponsiveContainer width="100%" height="92%">
      <PieChart>
        <Pie
          data={weatherDescriptionData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="80%"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default WeatherPieChart;
