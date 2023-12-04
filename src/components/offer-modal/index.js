"use client";
import { getInventoryService } from "@/services/alchemy";
import {
  Button,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CustomCheckbox } from "./custom-checkbox";
import { makeOfferService } from "@/services/offers";
import { bulkApprove } from "@/services/metamask";
import { useSelector } from "react-redux";

const OfferModal = ({ saleId, isOpen, onClose }) => {
  const account = useSelector((state) => state.auth.account);
  const [selectedNfts, setSelectedNfts] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getInventoryService(account).then((res) => setInventory(res));
  }, [account]);

  const makeOffer = async () => {
    bulkApprove(selectedNfts);
    await makeOfferService({
      sale: saleId,
      offerer: account,
      items: selectedNfts,
      isActive: true,
    });
    onClose();
  };

  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      backdrop="blur"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Pick NFTs</ModalHeader>
            <ModalBody>
              <CheckboxGroup
                label="Select NFTs"
                value={selectedNfts}
                onChange={setSelectedNfts}
                classNames={{
                  base: "w-full",
                }}
              >
                <div className="flex flex-wrap gap-4">
                  {inventory.length > 0 &&
                    inventory.map((nft, index) => (
                      <CustomCheckbox
                        key={nft.contract.address + nft.tokenId + index}
                        nft={nft}
                        value={nft}
                      />
                    ))}
                </div>
              </CheckboxGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={makeOffer}
                isDisabled={selectedNfts.length === 0}
              >
                Make Offer
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OfferModal;
