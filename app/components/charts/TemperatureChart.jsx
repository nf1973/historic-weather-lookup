import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Card from "../Card";

const TemperatureChart = ({ weatherData }) => {
  // Extract dates and maximum temperatures from the provided data
  const temperatureData = weatherData
    .map((entry) => ({
      date: String(entry.daily.time[0]).slice(0, 4), // Assuming each entry has only one date
      temperature_max: entry.daily.temperature_2m_max[0], // Max temperature for the day
      temperature_min: entry.daily.temperature_2m_min[0], // Min temperature for the day
    }))
    .reverse();

  return (
    <ResponsiveContainer height="92%" width="100%">
      <LineChart
        width={1000}
        height={200}
        data={temperatureData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: "°C", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend align="center" verticalAlign="bottom" />
        <Line
          type="monotone"
          dataKey="temperature_max"
          stroke="#f00"
          name="Max Temperature"
        />
        <Line
          type="monotone"
          dataKey="temperature_min"
          stroke="#00f"
          name="Min Temperature"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
