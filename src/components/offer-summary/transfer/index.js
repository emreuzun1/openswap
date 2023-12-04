import { createOffer, createSale } from "@/services/metamask";
import { Button } from "@nextui-org/react";

const Transfer = ({ sale, offer }) => {
  const transfer = () => {};

  return (
    <div>
      <Button onClick={() => createSale(sale, offer)}>Transfer</Button>
      <Button onClick={() => createOffer(sale.id, offer)}>Offer</Button>
    </div>
  );
};

export default Transfer;
