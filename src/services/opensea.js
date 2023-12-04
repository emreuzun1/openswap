export const getNfts = async (account) => {
  const response = await fetch(
    `https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${account}/nfts`
  );
  const data = await response.json();
  return data.nfts;
};

export const getNftById = async (contractAddress, identifier) => {
  const response = await fetch(
    `https://testnets-api.opensea.io/api/v2/chain/sepolia/contract/${contractAddress}/nfts/${identifier}`
  );
  const data = await response.json();
  return data.nft;
};
