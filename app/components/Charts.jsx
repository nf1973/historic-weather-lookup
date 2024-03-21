import Card from "./Card";
import TemperatureChart from "./charts/TemperatureChart";
import RainfallChart from "./charts/RainfallChart";
import WeatherPieChart from "./charts/WeatherPieChart";

const Charts = ({ foundLocation, weatherData }) => {
  return (
    <div className="bg-white text-[#05213c] py-4 px-4 w-full">
      <div className="container mx-auto flex flex-col justify-between items-center max-w-[1260px] py-3">
        <div className="mb-6 text-xl font-bold w-full">
          <div>
            <div className=" text-gray-600 font-base text-xs">
              <div className="grid grid-cols-12">
                <div className="col-span-12">
                  <Card
                    cardHeightClassName="h-[500px]"
                    cardTitle={"Minimum & Maximum Temperatures in °C"}
                  >
                    <TemperatureChart weatherData={weatherData} />
                  </Card>
                </div>
                <div className="col-span-7">
                  <Card
                    cardHeightClassName="h-[500px]"
                    cardTitle={"Precipitation in mm"}
                  >
                    <RainfallChart weatherData={weatherData} />
                  </Card>
                </div>
                <div className="col-span-5">
                  <Card
                    cardHeightClassName="h-[500px]"
                    cardTitle={"Type of Weather"}
                  >
                    <WeatherPieChart weatherData={weatherData} />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
