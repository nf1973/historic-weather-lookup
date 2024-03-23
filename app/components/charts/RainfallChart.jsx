import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const RainfallChart = ({ weatherData }) => {
  const rainfallData = weatherData
    .map((entry) => ({
      date: String(entry.daily.time[0]).slice(0, 4),
      precipitation_sum: entry.daily.precipitation_sum[0],
    }))
    .reverse();

  return (
    <ResponsiveContainer width="100%" height="92%">
      <BarChart data={rainfallData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: "mm", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="precipitation_sum"
          fill="#05213c"
          name="Precipitation in mm"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RainfallChart;
