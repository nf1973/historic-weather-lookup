import { decimalToDegreesMinutesSeconds } from "../utils/geo";

const Charts = ({ foundLocation, weatherData }) => {
  const [latitude, longitude] = decimalToDegreesMinutesSeconds(
    foundLocation.lat,
    foundLocation.lng
  );

  return (
    <div className="bg-white text-[#05213c] py-4 px-4 w-full">
      <div className="container mx-auto flex flex-col justify-between items-center max-w-[1260px] py-3">
        <div className="mb-6 text-xl font-bold w-full">
          <div>
            <p className="mt-8 text-gray-600 text-base font-base">
              Charts coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
