export const decimalToDegreesMinutesSeconds = (latitude, longitude) => {
  const latHemisphere = latitude >= 0 ? "N" : "S";
  const lonHemisphere = longitude >= 0 ? "E" : "W";
  latitude = Math.abs(latitude);
  longitude = Math.abs(longitude);

  const latDegrees = Math.floor(latitude);
  const lonDegrees = Math.floor(longitude);

  const latMinutesFloat = (latitude - latDegrees) * 60;
  const lonMinutesFloat = (longitude - lonDegrees) * 60;

  const latMinutes = Math.floor(latMinutesFloat);
  const lonMinutes = Math.floor(lonMinutesFloat);

  const latSeconds = Math.round((latMinutesFloat - latMinutes) * 60);
  const lonSeconds = Math.round((lonMinutesFloat - lonMinutes) * 60);

  const latResult = `${latDegrees}°${latMinutes}'${latSeconds}"${latHemisphere}`;
  const lonResult = `${lonDegrees}°${lonMinutes}'${lonSeconds}"${lonHemisphere}`;

  return [latResult, lonResult];
};
