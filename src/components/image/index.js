import Image from "next/image";

const ImageWithCheck = ({ metadata, width = 180, quality = 75 }) => {
  return (
    <>
      <Image
        width={width}
        height={width}
        quality={quality}
        className="object-cover rounded-lg"
        src={metadata.image_url}
        alt={metadata.title}
      />
    </>
  );
};

export default ImageWithCheck;
