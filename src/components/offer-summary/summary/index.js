import { RightArrowIcon } from "@/components/icons/right-arrow-icon";
import NFTCard from "@/components/nft-card";
import Image from "next/image";

const Summary = ({ sale, offer }) => {
  if (!sale || !offer) return <div>Loading</div>;
  return (
    <div className="flex items-center">
      <Image
        width={500}
        height={500}
        quality={100}
        src={sale.media[0].gateway}
        alt={sale.title}
      />
      <RightArrowIcon width="64" height="64" />
      <div className="flex flex-wrap gap-1">
        {offer.items.map((item) => (
          <NFTCard
            key={item.tokenId}
            onPress={() => {}}
            nft={item}
            width={100}
            isPressable={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Summary;
