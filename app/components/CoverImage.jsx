import Image from "next/image";

const CoverImage = () => {
  return (
    <div className="w-full">
      <Image
        src="/barometer.jpg"
        width={1024}
        height={697}
        alt="Picture of a barometer"
        layout="responsive"
      />
    </div>
  );
};

export default CoverImage;
