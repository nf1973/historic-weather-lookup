"use client";

import { useState } from "react";

import Header from "./components/Header";
import InputForm from "./components/InputForm";
import TabularData from "./components/TabularData";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import CoverImage from "./components/CoverImage";

export default function Home() {
  const [foundLocation, setFoundLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

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

        {loading && <Loading />}
        {weatherData && (
          <TabularData
            foundLocation={foundLocation}
            weatherData={weatherData}
          />
        )}
      </div>
      <div className="flex-shrink-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
