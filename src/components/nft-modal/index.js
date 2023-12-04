import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import ImageWithCheck from "../image";
import AreYouSureModal from "../are-you-sure-modal";
import { postSaleService } from "@/services/sales";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getNftById } from "@/services/alchemy";

const NFTModal = ({ contractAddress, tokenId, isOpen, onClose }) => {
  const {
    isOpen: isDialogOpen,
    onOpen: dialogOpen,
    onClose: dialogClose,
  } = useDisclosure();
  const [nft, setNft] = useState();

  useEffect(() => {
    getNftById(contractAddress, tokenId).then((res) => setNft(res));
  }, []);

  const postSale = () => {
    postSaleService({
      ...nft,
      isActive: true,
      owner: window.ethereum.selectedAddress,
    });
  };

  if (!nft) {
    return <div>Loading</div>;
  }

  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {nft.title}
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-4">
                <div>
                  <Image
                    width={300}
                    height={500}
                    quality={100}
                    className="object-cover rounded-lg"
                    src={nft.media[0].gateway}
                    alt={nft.title}
                  />
                </div>
                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="description"
                    title="Description"
                  >
                    {nft.description}
                  </AccordionItem>
                  <AccordionItem key="2" aria-label="traits" title="Traits">
                    <div className="flex flex-wrap gap-4">
                      {nft.rawMetadata.attributes.map((trait) => (
                        <div
                          className="flex flex-col items-center gap-1"
                          key={trait.trait_type}
                        >
                          <Chip size="lg" color="danger" variant="shadow">
                            {trait.trait_type}
                          </Chip>
                          <p>{trait.value}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                  <AccordionItem key="3" aria-label="details" title="Details">
                    {nft.description}
                  </AccordionItem>
                </Accordion>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={dialogOpen}>
                Create Sale
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
      <AreYouSureModal
        message="You sure you want to sell this NFT?"
        isOpen={isDialogOpen}
        onClose={dialogClose}
        onApprove={postSale}
        onParentClose={onClose}
      />
    </Modal>
  );
};

export default NFTModal;
