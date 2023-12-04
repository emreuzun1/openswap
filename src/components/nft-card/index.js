import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import NFTModal from "@/components/nft-modal";
import Image from "next/image";

const NFTCard = ({ nft, withModal = false, onPress, isPressable = true }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        key={nft.tokenId + nft.contract.address}
        radius="lg"
        isPressable={isPressable}
        onPress={() => (onPress ? onPress() : onOpen())}
        className={`w-full h-full py-2 bg-[#292f46]/50`}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
          <p className="text-tiny uppercase font-bold ">
            {nft.contract.symbol}
          </p>
          <h4 className="font-bold text-large w-full text-ellipsis overflow-hidden whitespace-nowrap text-left">
            {nft.title}
          </h4>
        </CardHeader>
        <CardBody className="py-2 overflow-hidden">
          {nft.media[0] && (
            <Image
              fill
              quality={75}
              className="object-cover rounded-lg hover:scale-105 transition-all"
              src={nft.media[0].gateway}
              alt={nft.title}
            />
          )}
        </CardBody>
      </Card>
      {isOpen && withModal && (
        <NFTModal
          isOpen={isOpen}
          onClose={onClose}
          contractAddress={nft.contract.address}
          tokenId={nft.tokenId}
        />
      )}
    </>
  );
};

export default NFTCard;
