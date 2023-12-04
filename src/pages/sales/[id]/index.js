import { HeartIcon } from "@/components/icons/heart-icon";
import { OfferIcon } from "@/components/icons/offer-icon";
import OfferAccordionItem from "@/components/offer-accordion-item";
import OfferModal from "@/components/offer-modal";
import SummaryModal from "@/components/offer-summary";
import { getSaleById } from "@/services/sales";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

const SaleItem = ({ sale }) => {
  const account = useSelector((state) => state.auth.account);
  const [selectedOfferId, setSelectedOfferId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: summaryIsOpen,
    onOpen: summaryOnOpen,
    onClose: summaryOnClose,
  } = useDisclosure();
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <div className="w-full flex gap-12">
      <div>
        <Image
          width={800}
          height={800}
          quality={100}
          src={sale.media[0].gateway}
          alt={sale.title}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-end justify-between">
          <div>
            <Link href="#">{sale.contract.name}</Link>
            <p className="text-4xl">{sale.title}</p>
          </div>
          <div>
            <Button
              isIconOnly
              color="danger"
              variant="shadow"
              aria-label="like"
            >
              <HeartIcon />
            </Button>
          </div>
        </div>
        <Card className="mt-4">
          <CardHeader className="justify-center py-8">
            {sale.owner !== account && account && (
              <Button
                variant="ghost"
                color="secondary"
                size="lg"
                onClick={onOpen}
              >
                Make an Offer
              </Button>
            )}
          </CardHeader>
          <Divider />
          <CardBody>
            <Accordion
              selectionMode="multiple"
              variant="shadow"
              itemClasses={itemClasses}
              showDivider={false}
            >
              <AccordionItem
                key="1"
                aria-label="offers"
                title="Offers"
                indicator={<OfferIcon className="text-primary" />}
                subtitle={
                  <p className="flex">
                    <b className="text-primary mr-1">{sale.offers.length}</b>
                    offers were made
                  </p>
                }
              >
                {sale.offers.length > 0 &&
                  sale.offers.map((offer) => (
                    <>
                      <OfferAccordionItem
                        key={offer.id}
                        offer={offer}
                        onCheck={() => {
                          setSelectedOfferId(offer.id);
                          summaryOnOpen();
                        }}
                        onDeny={() => {}}
                        isOwner={true}
                      />
                      <Divider />
                    </>
                  ))}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="Accordion 2"
              >
                Text
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Accordion 3"
              >
                Text
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>
      </div>
      {isOpen && (
        <OfferModal isOpen={isOpen} onClose={onClose} saleId={sale.id} />
      )}
      {summaryIsOpen && (
        <SummaryModal
          isOpen={summaryIsOpen}
          onClose={summaryOnClose}
          offerId={selectedOfferId}
        />
      )}
    </div>
  );
};

export default SaleItem;

export const getServerSideProps = async (context) => {
  const res = await getSaleById(context.query.id);
  if (res.data.status === "success") {
    return {
      props: {
        sale: res.data.sale,
      },
    };
  }
  return {
    props: {
      sale: null,
    },
  };
};
