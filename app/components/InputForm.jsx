"use client";
import { useState, useEffect } from "react";
import { fetchLocationData, fetchWeatherData } from "@/app/actions";
import { daysInMonth } from "@/app/utils/dates";

const DEFAULTLOCATION = "Frankfurt am Main";
const HISTORYYEARS = 20;

const InputForm = ({
  weatherData,
  setWeatherData,
  setFoundLocation,
  foundLocation,
  loading,
  setLoading,
  month,
  setMonth,
  day,
  setDay,
}) => {
  const [userEntry, setUserEntry] = useState(DEFAULTLOCATION);
  // const [month, setMonth] = useState("");
  // const [day, setDay] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const isValidDate = () => {
      return (
        month !== "" && day !== "" && day <= daysInMonth(month) && day >= 1
      );
    };

    const calculateSelectedDates = () => {
      if (isValidDate()) {
        const selectedDay = parseInt(day, 10);
        const selectedMonth = parseInt(month, 10);

        const previousDates = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        for (let i = currentYear; previousDates.length < HISTORYYEARS; i--) {
          const newDate = new Date(i, selectedMonth - 1, selectedDay, 12, 0, 0);
          const diffInDays = Math.ceil(
            (currentDate - newDate) / (1000 * 60 * 60 * 24)
          );

          // Ensure the new date is valid and not within the past 5 days
          if (!isNaN(newDate.getTime()) && diffInDays > 5) {
            previousDates.push(newDate.toISOString());
          }
        }

        setSelectedDates(previousDates);
      }
    };

    calculateSelectedDates();
  }, [month, day]);

  useEffect(() => {
    const currentDate = new Date();
    setMonth((currentDate.getMonth() + 1).toString().padStart(2, "0"));
    setDay(currentDate.getDate().toString().padStart(2, "0"));
  }, []);

  const handleLocationInputChange = (event) => {
    setUserEntry(event.target.value);
    setWeatherData(null);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setWeatherData(null);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
    setWeatherData(null);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    setLoading(true);
    setWeatherData(null);

    const locationData = await fetchLocationData(userEntry);
    setFoundLocation(locationData);
    console.log(locationData);

    const weatherDataList = [];

    if (locationData !== undefined) {
      const weatherDataList = [];

      for (const selectedDate of selectedDates) {
        const weatherData = await fetchWeatherData(
          locationData,
          selectedDate.split("T")[0]
        );
        weatherDataList.push(weatherData);
      }

      setWeatherData(weatherDataList);
      console.log(weatherDataList);

      setLoading(false);
    }
  };

  return (
    <div className="bg-[#05213c] text-white pt-4 pb-16 px-4 w-full">
      <form
        className="container mx-auto flex gap-0.5 max-w-[1260px] justify-center"
        onSubmit={handleSearch}
      >
        <div className="flex flex-wrap flex-grow items-center bg-white rounded-l p-2">
          <label
            className="text-gray-700 text-sm font-bold mr-2"
            htmlFor="townCityName"
          >
            Town/City Name (Europe only):
          </label>
          <input
            className="text-[#05213c] bg-transparent border-none focus:outline-none w-full"
            type="text"
            id="townCityName"
            name="townCityName"
            value={userEntry}
            onChange={handleLocationInputChange}
          />
        </div>
        <div className="flex flex-wrap items-center bg-white p-2">
          <label
            className="text-gray-700 text-sm font-bold mr-2"
            htmlFor="month"
          >
            Month:
          </label>
          <select
            className="text-[#05213c] bg-transparent border-none focus:outline-none w-full -ml-1"
            id="month"
            name="month"
            value={month}
            onChange={handleMonthChange}
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center bg-white rounded-r p-2">
          <label className="text-gray-700 text-sm font-bold mr-2" htmlFor="day">
            Day:
          </label>
          <select
            className="text-[#05213c] bg-transparent border-none focus:outline-none w-full -ml-1"
            id="day"
            name="day"
            value={day}
            onChange={handleDayChange}
          >
            {[...Array(daysInMonth(month)).keys()].map((day) => (
              <option
                key={day + 1}
                value={(day + 1).toString().padStart(2, "0")}
              >
                {day + 1}
              </option>
            ))}
          </select>
        </div>

        <button
          className=" bg-blue-600 hover:bg-blue-500 text-white font-bold ml-2 px-8  rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Search
        </button>
      </form>
      {weatherData && month === "02" && day === "29" && (
        <p className="text-red-300 text-center mt-6 -mb-10">
          Note: For non-leap years, 1st March is shown for comparison.
        </p>
      )}
    </div>
  );
};

export default InputForm;
