import { decimalToDegreesMinutesSeconds } from "../utils/geo";

const LocationInfo = ({ foundLocation, weatherData }) => {
  const [latitude, longitude] = decimalToDegreesMinutesSeconds(
    foundLocation.lat,
    foundLocation.lng
  );

  return (
    <div className="bg-white text-[#05213c] py-4 px-4 w-full">
      <div className="container mx-auto flex flex-col justify-between items-center max-w-[1260px] ">
        <div className=" text-xl font-bold w-full">
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
      </div>
    </div>
  );
};

export default LocationInfo;
