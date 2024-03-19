import { useState, useRef, useEffect } from "react";

const ViewSelector = ({ selectedView, setSelectedView }) => {
  const buttonRefs = useRef([]);

  useEffect(() => {
    if (buttonRefs.current[selectedView]) {
      buttonRefs.current[selectedView].focus();
    }
  }, [selectedView]);

  const handleButtonClick = (key) => {
    setSelectedView(key);
  };
  return (
    <div className="bg-white text-[#05213c] py-4 px-4 w-full">
      <div className="container mx-auto flex flex-col justify-between  max-w-[1260px] py-3">
        <div className="flex gap-4">
          <button
            ref={(el) => (buttonRefs.current["Statistics"] = el)}
            className={`flex-1 bg-[#05213c] hover:bg-blue-700 focus:bg-blue-700 text-white py-2 px-4 rounded`}
            onClick={() => handleButtonClick("Statistics")}
          >
            Statistics
          </button>
          <button
            ref={(el) => (buttonRefs.current["Charts"] = el)}
            className={`flex-1 bg-[#05213c] hover:bg-blue-700 focus:bg-blue-700 text-white py-2 px-4 rounded`}
            onClick={() => handleButtonClick("Charts")}
          >
            Charts
          </button>
          <button
            ref={(el) => (buttonRefs.current["Table"] = el)}
            className={`flex-1 bg-[#05213c] hover:bg-blue-700 focus:bg-blue-700 text-white py-2 px-4 rounded`}
            onClick={() => handleButtonClick("Table")}
          >
            Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSelector;
