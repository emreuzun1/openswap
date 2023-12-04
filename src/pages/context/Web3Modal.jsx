"use client";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { sepolia } from "viem/chains";
import { WagmiConfig } from "wagmi";

const projectId = "6ba7bb642ad519c361dd3e4036995248";

const metadata = {
  name: "Openswap",
  description: "Openswap Web3Modal",
  url: "https://web3modal.com",
};

const chains = [sepolia];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Modal({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
