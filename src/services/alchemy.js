import { Network, Alchemy, NftFilters, NftTokenType } from "alchemy-sdk";
require("dotenv").config();

// const account = "0x4BCd497e45949f7A7B89A2B297e71A396f39c471";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

export const getInventoryService = async (account) => {
  console.log(account);
  let nfts = await alchemy.nft.getNftsForOwner(account, {
    excludeFilters: [NftFilters.SPAM],
    pageSize: 100,
  });
  const data = nfts.ownedNfts;
  return data;
};

export const getNftById = async (contractAddress, tokenId) => {
  const data = await alchemy.nft.getNftMetadata(
    contractAddress,
    tokenId,
    NftTokenType.ERC721,
    0,
    true
  );
  return data;
};
