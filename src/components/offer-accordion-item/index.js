import { Button, Divider } from "@nextui-org/react";
import ImageWithCheck from "../image";
import { CheckIcon } from "../icons/check-icon";
import { DenyIcon } from "../icons/deny-icon";
import Image from "next/image";

const OfferAccordionItem = ({ offer, onCheck, onDeny, isOwner }) => {
  return (
    <div className="flex space-x-2 items-center py-2 relative">
      <div className="flex-1 grow-0">
        <Button size="sm" color="success" variant="shadow">
          Details
        </Button>
      </div>
      <Divider orientation="vertical" />
      <div className="flex grow space-x-2 overflow-x-scroll p-1">
        {offer.items.map((item) => (
          <Image
            metadata={item}
            width={72}
            height={72}
            className="object-cover rounded-lg"
            src={item.media[0].gateway}
            alt={item.title}
            quality={75}
            key={item.contract.address + item.tokenId}
          />
        ))}
      </div>
      {isOwner && (
        <div className="flex space-x-1 float-right grow-0">
          <Button isIconOnly color="danger" variant="ghost" onClick={onDeny}>
            <DenyIcon />
          </Button>
          <Button isIconOnly color="success" variant="ghost" onClick={onCheck}>
            <CheckIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default OfferAccordionItem;
