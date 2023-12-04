const { ethers } = require("ethers");
const { provider } = require("@/utils/ethers");
const ERC721 = require("@/abis/ERC721.json");
const OpenswapABI = require("@/abis/Openswap.json");
const signer = provider.getSigner();

const contractAddress = "0x3c22Ac0295cB36e989F4E7E80EA74D92aEcEAfFe";

export const getConnectedWallet = async () => {
  if (window.ethereum) {
    try {
      const response = await window.ethereum.request({
        method: "wallet_getPermissions",
      });
      if (response.length > 0) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        return {
          address: accounts[0],
          success: true,
        };
      }
      return {
        success: false,
        message: "Please connect your Metamask.",
      };
    } catch (err) {
      return { success: false, message: "Please connect your Metamask." };
    }
  } else {
    return { success: false, message: "Please connect your Metamask." };
  }
};

export const connectWalletRequest = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return {
        address: accounts[0],
        success: true,
      };
    } catch (err) {
      return { success: false, message: "Please connect your Metamask." };
    }
  } else {
    return { success: false, message: "Please connect your Metamask." };
  }
};

export const setApprovalForAll = async (nftContractAddreess, tokenId) => {
  const abi = ["function approve(address to, uint256 tokenId) external"];
  let iface = new ethers.utils.Interface(abi);
  const params = {
    from: window.ethereum.selectedAddress,
    to: nftContractAddreess,
    gasLimit: 0,
    data: iface.encodeFunctionData("approve", [contractAddress, tokenId]),
  };

  if (window.ethereum) {
    try {
      const response = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
};

export const bulkApprove = async (nfts) => {
  const abi = ["function approve(address to, uint256 tokenId) external"];
  let iface = new ethers.utils.Interface(abi);
  let params = [];
  for (let i = 0; i < nfts.length; i++) {
    const contract = new ethers.Contract(
      nfts[i].contract.address,
      ERC721,
      signer
    );
    try {
      const transaction = await contract.approve(
        contractAddress,
        nfts[i].tokenId
      );
      await transaction.wait();
      console.log(transaction.hash);
    } catch (err) {
      console.log(err);
    }
  }
};

export const createSale = async (sale, offer) => {
  const contract = new ethers.Contract(
    contractAddress,
    OpenswapABI.abi,
    signer
  );

  try {
    const transaction = await contract.createSale(
      sale.id,
      sale.tokenId,
      sale.contract.address,
      offer.offerer
    );
    await transaction.wait();
    console.log(transaction.hash);
  } catch (err) {
    console.log(err);
  }
};

export const createOffer = async (saleId, offer) => {
  const contract = new ethers.Contract(
    contractAddress,
    OpenswapABI.abi,
    signer
  );

  const offeredItemIds = offer.items.map(({ tokenId }) => parseInt(tokenId));
  const offeredNftsContract = offer.items.map(
    ({ contract }) => contract.address
  );

  try {
    const transaction = await contract.createOffer(
      saleId,
      offeredItemIds,
      offeredNftsContract,
      offeredItemIds.length
    );
    await transaction.wait();
    console.log(transaction.hash);
  } catch (err) {
    console.log(err);
  }
};
