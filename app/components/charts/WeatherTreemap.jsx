import { ResponsiveContainer, Treemap, Tooltip } from "recharts";

const WeatherTreemap = ({ weatherData }) => {
  const weatherDescriptionCounts = {};
  weatherData.forEach((entry) => {
    const description = entry.daily.weather_code_description;
    const color = entry.daily.weather_code_color;
    if (!weatherDescriptionCounts[description]) {
      weatherDescriptionCounts[description] = { name: description, value: 0 };
    }
    weatherDescriptionCounts[description].value++;
    weatherDescriptionCounts[description].fill = color;
  });

  const weatherDescriptionData = Object.values(weatherDescriptionCounts);

  return (
    <ResponsiveContainer width="100%" height="92%">
      <Treemap
        data={weatherDescriptionData}
        dataKey="value"
        ratio={4 / 3}
        stroke="#fff"
        fill="#fff"
      >
        <Tooltip />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default WeatherTreemap;
