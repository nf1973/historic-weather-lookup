const Footer = () => {
  return (
    <footer className="bg-[#05213c] text-white  py-2 px-4 w-full ">
      <div className="container mx-auto max-w-[1260px] py-4">
        <div className="text-xs font-light text-center flex flex-col">
          <p className="mb-2 text-sm">
            Made by Neil with{" "}
            <a href="https://nextjs.org/" target="_blank">
              Next.js
            </a>
          </p>
          <p>
            GeoCoding by{" "}
            <a href="https://www.geonames.org/" target="_blank">
              GeoNames.org
            </a>
          </p>
          <p>
            Historical weather data from{" "}
            <a href="https://open-meteo.com/" target="_blank">
              Open-Meteo.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
