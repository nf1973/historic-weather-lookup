"use server";

import { assignDirection } from "@/app/utils/geo";
import weatherCodeDescriptions from "./utils/weatherCodes";

const GEONAMES_SECRETKEY = process.env.GEONAMES_SECRETKEY;

export const fetchLocationData = async (location) => {
  try {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?formatted=true&q=${location}&maxRows=5&lang=en&&username=${GEONAMES_SECRETKEY}&style=full&isNameRequired=true&orderBy=population&continentCode=eu&featureCode=PPL&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLA3&&featureCode=PPLA4&featureCode=PPLA5&featureCode=PPLC&featureCode=PPLF&featureCode=PPLL&featureCode=PPLS&featureCode=STLMT`
    );
    const data = await response.json();
    return data.geonames[0];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchWeatherData = async (locationData, date) => {
  const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${locationData.lat}&longitude=${locationData.lng}&start_date=${date}&end_date=${date}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FBerlin`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const weatherData = await response.json();

    const weatherCode = weatherData.daily.weather_code;

    const weatherInfo = weatherCodeDescriptions[weatherCode] || {
      description: "Unknown",
      niceDay: false,
      color: "#000000",
    };
    weatherData.daily.weather_code_description = weatherInfo.description;
    weatherData.daily.weather_code_color = weatherInfo.color;
    weatherData.daily.nice_day = weatherInfo.niceDay;

    const windDirectionDegrees = parseInt(
      weatherData.daily.wind_direction_10m_dominant,
      0
    );

    const windDirection = assignDirection(windDirectionDegrees);
    weatherData.daily.wind_direction = windDirection;

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
