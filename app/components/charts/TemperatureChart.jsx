import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const TemperatureChart = ({ weatherData }) => {
  const formattedData = weatherData.map((entry) => ({
    date: String(entry.daily.time[0]).slice(0, 4),
    temperature: [
      entry.daily.temperature_2m_max[0],
      entry.daily.temperature_2m_min[0],
    ],
  }));

  const temperatureData = formattedData.reverse();

  return (
    <ResponsiveContainer height="92%" width="100%">
      <BarChart
        width={1000}
        height={200}
        data={temperatureData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: "°C", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Bar dataKey="temperature" fill="#05213c" name="Temperature Range" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
