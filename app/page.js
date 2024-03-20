"use client";

import { useState } from "react";

import Header from "./components/Header";
import InputForm from "./components/InputForm";
import TabularData from "./components/TabularData";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import CoverImage from "./components/CoverImage";
import ViewSelector from "./components/ViewSelector";
import Charts from "./components/Charts";
import Statistics from "./components/Statistics";

export default function Home() {
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
          weatherData={weatherData}
          setWeatherData={setWeatherData}
          foundLocation={foundLocation}
          setFoundLocation={setFoundLocation}
          loading={loading}
          setLoading={setLoading}
        />

        {!loading && !weatherData && <CoverImage />}

        {!loading && weatherData && (
          <ViewSelector
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
        )}

        {loading && <Loading />}

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
