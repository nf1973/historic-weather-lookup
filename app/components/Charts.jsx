import Card from "./Card";
import TemperatureChart from "./charts/TemperatureChart";
import RainfallChart from "./charts/RainfallChart";

const Charts = ({ foundLocation, weatherData }) => {
  return (
    <div className="bg-white text-[#05213c] py-4 px-4 w-full">
      <div className="container mx-auto flex flex-col justify-between items-center max-w-[1260px] py-3">
        <div className="mb-6 text-xl font-bold w-full">
          <div>
            <p className="mt-8 text-gray-600 text-base font-base">
              <Card
                cardHeightClassName="h-[500px]"
                cardTitle={"Minimum & Maximum Temperatures in °C"}
              >
                <TemperatureChart weatherData={weatherData} />
              </Card>
              <Card
                cardHeightClassName="h-[500px]"
                cardTitle={"Precipitation in mm"}
              >
                <RainfallChart weatherData={weatherData} />
              </Card>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
