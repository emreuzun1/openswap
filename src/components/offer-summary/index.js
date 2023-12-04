import { useEffect, useState } from "react";
import { getOfferByIdService } from "@/services/offers";
import { Modal, ModalBody, ModalContent, Tab, Tabs } from "@nextui-org/react";
import { getSaleById } from "@/services/sales";
import Summary from "./summary";
import Approve from "./approve";
import Transfer from "./transfer";

const SummaryModal = ({ offerId, isOpen, onClose }) => {
  const [offer, setOffer] = useState();
  const [sale, setSale] = useState();
  const [selected, setSelected] = useState("summary");

  useEffect(() => {
    getOfferByIdService(offerId).then((res) => setOffer(res.data.offer));
  }, []);

  useEffect(() => {
    if (offer) getSaleById(offer.sale.id).then((res) => setSale(res.data.sale));
  }, [offer]);

  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <Tabs
              fullWidth
              size="lg"
              aria-label="Summary form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="summary" title="Summary">
                <Summary sale={sale} offer={offer} />
              </Tab>
              <Tab key="approve" title="Approve">
                <Approve sale={sale} offer={offer} />
              </Tab>
              <Tab key="transfer" title="Transfer">
                <Transfer sale={sale} offer={offer} />
              </Tab>
            </Tabs>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SummaryModal;
