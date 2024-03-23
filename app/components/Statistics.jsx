import { decimalToDegreesMinutesSeconds } from "../utils/geo";
import Card from "./Card";
import {
  findMax,
  findMin,
  findMostFrequentItem,
  countNiceDays,
} from "../utils/weather";

const Statistics = ({ foundLocation, weatherData }) => {
  const [latitude, longitude] = decimalToDegreesMinutesSeconds(
    foundLocation.lat,
    foundLocation.lng
  );

  // Count Snow Days
  const snowDays = weatherData.filter((day) =>
    /snow/i.test(day.daily.weather_code_description)
  );

  return (
    <div className="bg-white text-[#05213c] py-4 px-4 w-full">
      <div className="container mx-auto flex flex-col justify-between items-center max-w-[1260px] py-3">
        <div className="grid grid-cols-6 gap-4 font-base text-gray-400 text-3xl ">
          {/* Cards */}

          <div className="col-span-6 md:col-span-3 lg:col-span-4">
            <Card>
              <p className="flex items-center h-full">
                <span className="inline">
                  The{" "}
                  <span className="text-[#05213c] font-bold">
                    maximum temperature{" "}
                  </span>{" "}
                  across all the years was{" "}
                  <span className="font-bold text-[#05213c]">
                    {findMax(
                      weatherData.map((day) => day.daily.temperature_2m_max)
                    ).toFixed(1)}{" "}
                    °C
                  </span>
                </span>
              </p>
            </Card>
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <Card>
              <p className="flex items-center h-full">
                <span className="inline">
                  In the{" "}
                  <span className="text-[#05213c] font-bold">
                    coldest year{" "}
                  </span>{" "}
                  it was only{" "}
                  <span className="font-bold text-[#05213c]">
                    {findMin(
                      weatherData.map((day) => day.daily.temperature_2m_max)
                    ).toFixed(1)}{" "}
                    °C
                  </span>{" "}
                  during the{" "}
                  <span className="text-[#05213c] font-bold">day </span>
                </span>
              </p>
            </Card>
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <Card>
              <p className="flex items-center h-full">
                <span className="inline">
                  The{" "}
                  <span className="text-[#05213c] font-bold">
                    coldest night{" "}
                  </span>{" "}
                  was{" "}
                  <span className="font-bold text-[#05213c]">
                    {findMin(
                      weatherData.map((day) => day.daily.temperature_2m_min)
                    ).toFixed(1)}{" "}
                    °C
                  </span>
                </span>
              </p>
            </Card>
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-4">
            <Card>
              <p className="flex items-center h-full">
                <span className="inline">
                  On{" "}
                  <span className="text-[#05213c] font-bold">
                    {(
                      (weatherData.filter(
                        (day) => Number(day.daily.precipitation_sum) === 0
                      ).length /
                        weatherData.length) *
                      100
                    ).toFixed(0)}
                    %
                  </span>{" "}
                  of the years, the day was{" "}
                  <span className="font-bold text-[#05213c]">dry</span>
                </span>
              </p>
            </Card>
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <Card>
              <p className="flex items-center h-full">
                <span className="inline">
                  The weather was{" "}
                  <span className="font-bold text-[#05213c]">
                    {
                      findMostFrequentItem(
                        weatherData.map((day) =>
                          String(
                            day.daily.weather_code_description
                          ).toLowerCase()
                        )
                      ).item
                    }
                  </span>{" "}
                  in{" "}
                  <span className="font-bold text-[#05213c]">
                    {findMostFrequentItem(
                      weatherData.map(
                        (day) => day.daily.weather_code_description
                      )
                    ).percentage.toFixed(0)}
                    %
                  </span>{" "}
                  of the years
                </span>
              </p>
            </Card>
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <Card>
              <p className="flex items-center h-full">
                <span className="inline">
                  The{" "}
                  <span className="text-[#05213c] font-bold">wettest day </span>
                  brought{" "}
                  <span className="font-bold text-[#05213c]">
                    {findMax(
                      weatherData.map((day) => day.daily.precipitation_sum)
                    ).toFixed(1)}{" "}
                    mm
                  </span>{" "}
                  of rain
                </span>
              </p>
            </Card>
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <Card>
              <p className="flex items-center h-full">
                <span className="inline">
                  It was a{" "}
                  <span className="text-[#05213c] font-bold">nice day </span>
                  in{" "}
                  <span className="font-bold text-[#05213c]">
                    {(
                      (countNiceDays(weatherData) / weatherData.length) *
                      100
                    ).toFixed(0)}
                    %{" "}
                  </span>{" "}
                  of the years
                </span>
              </p>
            </Card>
          </div>

          {snowDays.length > 0 && (
            <div className="col-span-6 md:col-span-3 lg:col-span-4">
              <Card>
                <p className="flex items-center h-full">
                  <span className="inline">
                    It <span className="text-[#05213c] font-bold">snowed </span>
                    on this day in{" "}
                    <span className="font-bold text-[#05213c]">
                      {((snowDays.length / weatherData.length) * 100).toFixed(
                        0
                      )}
                      {"% "}
                    </span>
                    of the years
                  </span>
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
