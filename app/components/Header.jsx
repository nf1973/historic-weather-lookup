import { FaCloudSunRain } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-[#05213c] text-white py-4 px-4 w-full">
      <div className="container mx-auto flex justify-between items-center max-w-[1260px] py-4">
        <a href="/">
          {" "}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-semibold flex items-center">
              <FaCloudSunRain className="mr-2" /> Historic Weather Lookup
            </h1>
          </div>
        </a>

        <nav className="items-center space-x-6 hidden lg:flex ">
          <a
            href="https://github.com/nf1973/historic-weather-lookup/blob/main/README.md"
            className="hover:text-gray-300 "
            target="_blank"
          >
            How it Works
          </a>
          <a
            href="https://github.com/nf1973"
            className="hover:text-gray-300"
            target="_blank"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
