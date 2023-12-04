"use client";
import { ethers } from "ethers";

let provider;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/34532cd0545c4ee5926857ab9c04f60d"
  );
}

export { provider };
