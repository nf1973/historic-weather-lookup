import { useState, useEffect } from "react";
import { decimalToDegreesMinutesSeconds } from "@/app/utils/geo";

const TabularData = ({ foundLocation, weatherData }) => {
  const [latitude, longitude] = decimalToDegreesMinutesSeconds(
    foundLocation.lat,
    foundLocation.lng
  );

  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    // Set default sorting to Year (descending)
    setSortConfig({ key: "time", direction: "descending" });
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sortableData = [...weatherData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const valueA =
          typeof a.daily[sortConfig.key] === "string"
            ? a.daily[sortConfig.key]
            : String(a.daily[sortConfig.key]);
        const valueB =
          typeof b.daily[sortConfig.key] === "string"
            ? b.daily[sortConfig.key]
            : String(b.daily[sortConfig.key]);

        if (sortConfig.key === "weather_code_description") {
          // Custom sorting for the "Weather" column
          if (sortConfig.direction === "ascending") {
            return valueA.localeCompare(valueB);
          } else {
            return valueB.localeCompare(valueA);
          }
        } else {
          // Numeric comparison for other columns
          const parsedValueA = parseFloat(valueA.replace(",", "."));
          const parsedValueB = parseFloat(valueB.replace(",", "."));

          if (!isNaN(parsedValueA) && !isNaN(parsedValueB)) {
            // Numeric comparison if both values are valid numbers
            return sortConfig.direction === "ascending"
              ? parsedValueA - parsedValueB
              : parsedValueB - parsedValueA;
          } else {
            // Fallback to string comparison for other cases
            return sortConfig.direction === "ascending"
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          }
        }
      });
    }
    return sortableData;
  };

  return (
    <div className="bg-white text-[#05213c] py-4 px-4 w-full">
      <div className="container mx-auto flex flex-col justify-between items-center max-w-[1260px]">
        <table className="w-full bg-white divide-y divide-gray-200 px-4">
          <thead className="bg-[#05213c] text-white">
            <tr>
              <SortableHeader
                label="Year"
                onClick={() => handleSort("time")}
                sortConfig={sortConfig}
                currentKey="time"
              />
              <SortableHeader
                label="Max Temperature (°C)"
                onClick={() => handleSort("temperature_2m_max")}
                sortConfig={sortConfig}
                currentKey="temperature_2m_max"
              />
              <SortableHeader
                label="Min Temperature (°C)"
                onClick={() => handleSort("temperature_2m_min")}
                sortConfig={sortConfig}
                currentKey="temperature_2m_min"
              />
              <SortableHeader
                label="Dominant Wind Direction"
                onClick={() => handleSort("wind_direction")}
                sortConfig={sortConfig}
                currentKey="wind_direction"
              />
              <SortableHeader
                label="Wind Speed"
                onClick={() => handleSort("wind_speed_10m_max")}
                sortConfig={sortConfig}
                currentKey="wind_speed_10m_max"
              />
              <SortableHeader
                label="Precipitation"
                onClick={() => handleSort("precipitation_sum")}
                sortConfig={sortConfig}
                currentKey="precipitation_sum"
              />
              <SortableHeader
                label="Weather"
                onClick={() => handleSort("weather_code_description")}
                sortConfig={sortConfig}
                currentKey="weather_code_description"
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData().map((date, index) => (
              <tr
                key={date.daily.time}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-6 py-3 whitespace-nowrap text-center">
                  {date.daily.time.toString().slice(0, 4)}
                </td>
                <td className="px-8 py-3 text-right whitespace-nowrap ">
                  {Number(date.daily.temperature_2m_max).toFixed(1)}°C
                </td>
                <td className="px-8 py-3 text-right whitespace-nowrap">
                  {Number(date.daily.temperature_2m_min).toFixed(1)}°C
                </td>
                <td className="px-6 py-3 text-center whitespace-nowrap hidden lg:table-cell">
                  {date.daily.wind_direction}
                </td>
                <td className="px-6 py-3 text-right whitespace-nowrap hidden lg:table-cell">
                  {Number(date.daily.wind_speed_10m_max).toFixed(1)} km/h
                </td>
                <td className="px-8 py-3 text-right whitespace-nowrap hidden lg:table-cell">
                  {Number(date.daily.precipitation_sum).toFixed(1)} mm
                </td>
                <td className="px-6 py-3 text-right whitespace-nowrap">
                  {date.daily.weather_code_description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SortableHeader = ({ label, onClick, sortConfig, currentKey }) => {
  const isSorted = sortConfig && sortConfig.key === currentKey;

  const classNames = [
    "cursor-pointer",
    "px-6",
    "py-3",
    "text-right",
    "text-xs",
    "font-medium",
    "uppercase",
    "tracking-wider",
  ];

  // Conditional class names
  if (currentKey === "time") classNames.push("rounded-tl-md");
  if (currentKey === "weather_code_description")
    classNames.push("rounded-tr-md");
  if (
    currentKey === "wind_direction" ||
    currentKey === "wind_speed_10m_max" ||
    currentKey === "precipitation_sum"
  )
    classNames.push("hidden", "lg:table-cell");

  return (
    <th className={classNames.join(" ")} onClick={onClick}>
      {label}
      {isSorted && (
        <span>{sortConfig.direction === "ascending" ? " ▲" : " ▼"}</span>
      )}
    </th>
  );
};

export default TabularData;
