import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SOLANA_MAINNET } from "../solana/NFT/utils/constants";
import { useMemo } from "react";

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "../styles/walletModal.scss";

const ENDPOINTS = [
  {
    name: "mainnet-beta",
    endpoint: SOLANA_MAINNET,
  },
  {
    name: "mainnet-beta (Solana)",
    endpoint: "https://api.mainnet-beta.solana.com",
  },
  {
    name: "mainnet-beta (Serum)",
    endpoint: "https://solana-api.projectserum.com/",
  },
  {
    name: "testnet",
    endpoint: "https://api.testnet.solana.com",
  },
  {
    name: "devnet",
    endpoint: "https://api.devnet.solana.com",
  },
  {
    name: "rpc_devnet",
    endpoint: "https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/",
  },
];

function MyApp({ Component, pageProps }: AppProps) {
  const endpointUrl = ENDPOINTS[5].endpoint;

  const endpoint = useMemo(() => endpointUrl, []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
