import React from "react";
import { decimalToDegreesMinutesSeconds } from "@/app/utils/geo";

const TabularData = ({ foundLocation, weatherData }) => {
  const [latitude, longitude] = decimalToDegreesMinutesSeconds(
    foundLocation.lat,
    foundLocation.lng
  );
  return (
    <div className="bg-white text-[#05213c] py-4 px-4 w-full">
      <div className="container mx-auto flex flex-col justify-between items-center max-w-[1260px] py-3">
        <div className="mb-6 text-xl font-bold w-full">
          <p>
            Showing historic weather for{" "}
            {[
              foundLocation.adminName5,
              foundLocation.adminName4,
              foundLocation.adminName3,
              foundLocation.adminName2,
              foundLocation.adminName1,
              foundLocation.countryName,
            ]
              .filter((value) => value) // Filter out empty values
              .join(", ")}
          </p>
          <p className="text-gray-600 text-base font-light">
            {latitude}, {longitude}
          </p>
        </div>
        <table className="w-full bg-white divide-y divide-gray-200 px-4">
          <thead className="bg-[#05213c] text-white ">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider rounded-tl-md ">
                Year
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                Max Temperature (°C)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                Min Temperature (°C)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider hidden lg:table-cell">
                Prevailing Wind Direction
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider hidden lg:table-cell">
                Max Wind Speed
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider hidden lg:table-cell">
                Precipitation
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider rounded-tr-md">
                Weather
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {weatherData.map((date, index) => (
              <tr
                key={date.daily.time}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-6 py-3 whitespace-nowrap text-center">
                  {date.daily.time.toString().slice(0, 4)}
                </td>
                <td className="px-6 py-3 text-right whitespace-nowrap">
                  {date.daily.temperature_2m_max}°C
                </td>
                <td className="px-6 py-3 text-right whitespace-nowrap">
                  {date.daily.temperature_2m_min}°C
                </td>
                <td className="px-6 py-3 text-right whitespace-nowrap hidden lg:table-cell">
                  {date.daily.wind_direction_10m_dominant}°
                </td>
                <td className="px-6 py-3 text-right whitespace-nowrap hidden lg:table-cell">
                  {date.daily.wind_speed_10m_max} km/h
                </td>
                <td className="px-6 py-3 text-right whitespace-nowrap hidden lg:table-cell">
                  {date.daily.precipitation_sum} mm
                </td>
                <td className="px-6 py-3 text-center whitespace-nowrap">
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

export default TabularData;
