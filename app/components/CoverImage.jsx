import Image from "next/image";

const CoverImage = () => {
  return (
    <div className="bg-white text-[#05213c] py-4 px-4 w-full">
      <div className="container mx-auto flex flex-col justify-between  max-w-[1260px] pt-5">
        <Image
          className="w-full h-auto rounded-xl"
          src="/weather_history.jpg"
          width="0"
          height="0"
          sizes="100vw"
          alt="Picture of a barometer"
        />
      </div>
    </div>
  );
};

export default CoverImage;
