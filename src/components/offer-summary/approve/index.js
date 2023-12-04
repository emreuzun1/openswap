import { setApprovalForAll } from "@/services/metamask";
import { Button } from "@nextui-org/react";

const Approve = ({ sale, offer }) => {
  const approve = () => {
    setApprovalForAll(sale.contract.address, sale.tokenId);
  };

  return (
    <div>
      <Button onClick={approve}>Approve</Button>
    </div>
  );
};

export default Approve;
