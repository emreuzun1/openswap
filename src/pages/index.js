import NFTCard from "@/components/nft-card";
import { getAllSaleService } from "@/services/sales";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export default function Home({ sales }) {
  const router = useRouter();
  const { address } = useAccount();
  console.log(address);
  return (
    <div className="flex flex-wrap gap-4">
      {sales &&
        sales.map((nft, index) => (
          <div className="w-[300px] h-[400px]" key={index}>
            <NFTCard
              nft={nft}
              withModal={false}
              onPress={() => router.push(`/sales/${nft.id}`)}
            />
          </div>
        ))}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const res = await getAllSaleService();
  return {
    props: {
      sales: res.data.sales,
    },
  };
};
