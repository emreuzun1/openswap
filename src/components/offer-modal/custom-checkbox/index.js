import React from "react";
import { Checkbox, cn } from "@nextui-org/react";
import NFTCard from "@/components/nft-card";

export const CustomCheckbox = ({ nft, value }) => {
  return (
    <Checkbox
      aria-label={nft.title}
      classNames={{
        base: cn(
          "inline-flex bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
          "w-full",
          "bg-[#292f46]/50"
        ),
      }}
      value={value}
    >
      <div className="w-[250px] h-[300px]">
        <NFTCard
          key={nft.tokenId}
          onPress={() => {}}
          nft={nft}
          isPressable={false}
        />
      </div>
    </Checkbox>
  );
};
