import { Button, CircularProgress } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal, WalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Tilt from "react-vanilla-tilt";
import { beginMintNFT } from "../../solana/NFT/mint";
import styles from "./MainHeader.module.scss";

export function MainHeader() {
  const [isMinting, setIsMinting] = useState(false);
  const [txId, setTxId] = useState<string | undefined>(undefined);
  const [headerMessage, setHeaderMessage] = useState<string>("Mint NFT");
  const walletModal = useWalletModal();
  const wallet = useWallet();

  useEffect(() => {
    if (!txId) {
      if (isMinting) {
        setHeaderMessage("Minting");
      } else {
        setHeaderMessage("Mint NFT");
      }
    } else {
      if (!isMinting)
        setHeaderMessage(`Minted! Click here to view transaction`);
    }
  }, [isMinting, txId]);

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {walletModal.visible && <WalletModal />}
      <Tilt
        className={styles.tiltBox}
        style={{ display: "grid", justifyItems: "center" }}
      >
        <h3>{"Joan"}</h3>
        {wallet.connected && (
          <Button
            className={styles.mintNFTButton}
            style={{
              position: "absolute",
              minWidth: "40vw",
              minHeight: "20vh",
              borderRadius: "15px",
              fontSize: "calc(5vw + 1rem)",
            }}
            onClick={async () => {
              if (!wallet.wallet) {
                console.log(`WalletNotConnected: ${walletModal.visible}`);
                return walletModal.setVisible(true);
              }
              if (!txId && !isMinting)
                return setTxId(await beginMintNFT(wallet, setIsMinting));
            }}
          >
            <div>
              {isMinting && (
                <CircularProgress
                  color={"secondary"}
                  size={!isMobile ? 80 : 40}
                />
              )}

              {txId && !isMinting ? (
                <a
                  style={{ margin: "10px" }}
                  href={`https://explorer.solana.com/tx/${txId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`Minted!`}
                </a>
              ) : (
                headerMessage
              )}
            </div>
          </Button>
        )}
      </Tilt>
    </div>
  );
}
