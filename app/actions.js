"use server";

import { assignDirection } from "@/app/utils/geo";

const GEONAMES_SECRETKEY = process.env.GEONAMES_SECRETKEY;

const weatherCodeDescriptions = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Freezing Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  56: "Light Freezing Drizzle",
  57: "Freezing Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  66: "Light Freezing Rain",
  67: "Freezing Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Light Rain Shower",
  81: "Rain Shower",
  82: "Heavy Rain Shower",
  85: "Snow Shower",
  86: "Heavy Snow Shower",
  95: "Thunderstorm",
  96: "Hailstorm",
  99: "Heavy Hailstorm",
};

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
    const weatherCodeDescription =
      weatherCodeDescriptions[weatherCode] || "Unknown";
    weatherData.daily.weather_code_description = weatherCodeDescription;

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
