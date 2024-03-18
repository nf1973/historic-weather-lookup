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

export const assignDirection = (degrees) => {
  // Normalize degrees to be between 0 and 360
  degrees = (degrees + 360) % 360;

  let direction;

  switch (true) {
    case (degrees >= 337.5 && degrees < 360) ||
      (degrees >= 0 && degrees < 22.5):
      direction = "N";
      break;
    case degrees >= 22.5 && degrees < 67.5:
      direction = "NE";
      break;
    case degrees >= 67.5 && degrees < 112.5:
      direction = "E";
      break;
    case degrees >= 112.5 && degrees < 157.5:
      direction = "SE";
      break;
    case degrees >= 157.5 && degrees < 202.5:
      direction = "S";
      break;
    case degrees >= 202.5 && degrees < 247.5:
      direction = "SW";
      break;
    case degrees >= 247.5 && degrees < 292.5:
      direction = "W";
      break;
    case degrees >= 292.5 && degrees < 337.5:
      direction = "NW";
      break;
    default:
      direction = "Invalid input";
      break;
  }

  return direction;
};
