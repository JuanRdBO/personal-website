import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  MintLayout,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createInitializeMintInstruction,
} from "@solana/spl-token";

import { serialize } from "borsh";

import BN from "bn.js";
import { SOLANA_MAINNET } from "./utils/constants";
import {
  Creator,
  Data,
  CreateMetadataArgs,
  CreateMasterEditionArgs,
  METADATA_SCHEMA,
} from "./utils/schema";
import {
  createMetadataInstruction,
  createMasterEditionInstruction,
} from "./utils/utils";
import { Wallet } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { sendTransaction, sendTransactionWithRetry } from "./utils/connection";

const METAPLEX_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function beginMintNFT(destinationUser: WalletContextState) {
  if (!destinationUser.publicKey) {
    throw new Error("No user found");
  }

  console.log(`User: ${destinationUser.publicKey}`);

  let connection: Connection = new Connection(SOLANA_MAINNET, "confirmed");

  await delay(1000);

  const creators = [
    new Creator({
      address: destinationUser.publicKey.toBase58(),
      share: 100,
      verified: 1,
    }),
  ];

  const data = new Data({
    symbol: "JRBO",
    name: "JuanRdBO",
    uri: "https://arweave.net/m2KmunAmMkTEjeneFQrqyyytX4tbQd8sk_KajOM63Ew",
    sellerFeeBasisPoints: 100,
    creators,
  });

  await mintNFT(connection, destinationUser, data);
}

async function mintNFT(
  connection: Connection,
  creator: WalletContextState,
  data: Data
): Promise<void> {
  const mint = new Keypair();

  /*   const anchorWallet = useMemo(() => {
    if (
      !creator ||
      !creator.publicKey ||
      !creator.signAllTransactions ||
      !creator.signTransaction
    ) {
      return;
    }

    return {
      publicKey: creator.publicKey,
      signAllTransactions: creator.signAllTransactions,
      signTransaction: creator.signTransaction,
    } as anchor.Wallet;
  }, [creator]); */

  if (!creator.publicKey) throw new Error("No user found");

  // Allocate memory for the account
  const mintRent = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span
  );

  // Create mint account
  const createMintAccountIx = SystemProgram.createAccount({
    fromPubkey: creator.publicKey,
    newAccountPubkey: mint.publicKey,
    lamports: mintRent,
    space: MintLayout.span,
    programId: TOKEN_PROGRAM_ID,
  });

  // Initalize mint ix
  // Creator keypair is mint and freeze authority
  const initMintIx = createInitializeMintInstruction(
    mint.publicKey,
    0,
    creator.publicKey,
    null
  );

  // Derive associated token account for user
  const assoc = await getAssociatedTokenAddress(
    mint.publicKey,
    creator.publicKey
  );

  // Create associated account for user
  const createAssocTokenAccountIx = createAssociatedTokenAccountInstruction(
    creator.publicKey,
    assoc,
    creator.publicKey,
    mint.publicKey
  );

  // Create mintTo ix; mint to user's associated account
  const mintToIx = createMintToInstruction(
    mint.publicKey,
    assoc,
    creator.publicKey, // Mint authority
    1
  );

  // Derive metadata account
  const metadataSeeds = [
    Buffer.from("metadata"),
    METAPLEX_PROGRAM_ID.toBuffer(),
    mint.publicKey.toBuffer(),
  ];
  const [metadataAccount, _pda] = await PublicKey.findProgramAddress(
    metadataSeeds,
    METAPLEX_PROGRAM_ID
  );

  // Derive Master Edition account
  const masterEditionSeeds = [
    Buffer.from("metadata"),
    METAPLEX_PROGRAM_ID.toBuffer(),
    mint.publicKey.toBuffer(),
    Buffer.from("edition"),
  ];
  const [masterEditionAccount, _] = await PublicKey.findProgramAddress(
    masterEditionSeeds,
    METAPLEX_PROGRAM_ID
  );

  let buffer = Buffer.from(
    serialize(
      METADATA_SCHEMA,
      new CreateMetadataArgs({ data, isMutable: true })
    )
  );

  // Create metadata account ix
  const createMetadataIx = createMetadataInstruction(
    metadataAccount,
    mint.publicKey,
    creator.publicKey,
    creator.publicKey,
    creator.publicKey,
    buffer
  );

  buffer = Buffer.from(
    serialize(
      METADATA_SCHEMA,
      new CreateMasterEditionArgs({ maxSupply: new BN(0) })
    )
  );

  const createMasterEditionIx = createMasterEditionInstruction(
    metadataAccount,
    masterEditionAccount,
    mint.publicKey,
    creator.publicKey,
    creator.publicKey,
    creator.publicKey,
    buffer
  );

  let tx = new Transaction()
    .add(createMintAccountIx)
    .add(initMintIx)
    .add(createAssocTokenAccountIx)
    .add(mintToIx)
    .add(createMetadataIx)
    .add(createMasterEditionIx);

  const recent = await connection.getLatestBlockhash();
  tx.recentBlockhash = recent.blockhash;
  tx.feePayer = creator.publicKey;

  /*   if (!tx || creator.signTransaction) throw new Error("No user found"); */

  tx.sign(mint);

  console.log(`Transaction: ${JSON.stringify(tx)}`);

  const txSig = await sendTransactionWithRetry(
    connection,
    creator,
    tx.instructions,
    [mint],
    "confirmed"
  );

  /* const txSignature = await creator.sendTransaction(tx, connection); */
  /*   creator.signTransaction(tx);

  const txSignature = await connection.sendRawTransaction(tx.serialize()); */

  console.log(txSig);
}
