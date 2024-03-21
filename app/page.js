"use client";

import { useState } from "react";

import Header from "./components/Header";
import InputForm from "./components/InputForm";
import TabularData from "./components/TabularData";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import CoverImage from "./components/CoverImage";
import ViewSelector from "./components/ViewSelector";
import LocationInfo from "./components/LocationInfo";
import Charts from "./components/Charts";
import Statistics from "./components/Statistics";
import LocationNotFound from "./components/LocationNotFound";

export default function Home() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [foundLocation, setFoundLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedView, setSelectedView] = useState("Statistics");

  return (
    <main className="bg-white flex flex-col items-center justify-between w-full mx-auto min-h-screen">
      <div className="flex-shrink-0 w-full">
        <Header />
      </div>
      <div className="flex-grow w-full">
        <InputForm
          month={month}
          setMonth={setMonth}
          day={day}
          setDay={setDay}
          weatherData={weatherData}
          setWeatherData={setWeatherData}
          foundLocation={foundLocation}
          setFoundLocation={setFoundLocation}
          loading={loading}
          setLoading={setLoading}
        />

        {!loading && !weatherData && <CoverImage />}

        {!loading && weatherData && (
          <>
            <ViewSelector
              selectedView={selectedView}
              setSelectedView={setSelectedView}
            />
            <LocationInfo
              foundLocation={foundLocation}
              weatherData={weatherData}
              month={month}
              day={day}
            />
          </>
        )}

        {loading && foundLocation !== undefined && <Loading />}

        {foundLocation === undefined && <LocationNotFound />}

        {weatherData && selectedView === "Table" && (
          <TabularData
            foundLocation={foundLocation}
            weatherData={weatherData}
          />
        )}

        {weatherData && selectedView === "Charts" && (
          <Charts foundLocation={foundLocation} weatherData={weatherData} />
        )}

        {weatherData && selectedView === "Statistics" && (
          <Statistics foundLocation={foundLocation} weatherData={weatherData} />
        )}
      </div>
      <div className="flex-shrink-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
