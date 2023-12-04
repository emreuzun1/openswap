import NFTCard from "@/components/nft-card";
import { getInventoryService } from "@/services/alchemy";
import { getNfts } from "@/services/opensea";

const Inventory = ({ inventory }) => {
  console.log(inventory);
  return (
    <div className="flex flex-wrap gap-4">
      {inventory.length > 0 &&
        inventory.map(
          (nft, index) =>
            nft.tokenType === "ERC721" &&
            nft.title && (
              <div className="w-[300px] h-[400px]" key={index}>
                <NFTCard nft={nft} onPress={null} withModal={true} />
              </div>
            )
        )}
    </div>
  );
};

export default Inventory;

export const getServerSideProps = async (context) => {
  const res = await getInventoryService(context.params.id);
  return {
    props: {
      inventory: JSON.parse(JSON.stringify(res)),
    },
  };
};
