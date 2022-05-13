import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
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

const METAPLEX_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function beginMintNFT(destinationUser: Wallet) {
  let connection: Connection = new Connection(SOLANA_MAINNET, "confirmed");

  let creator = new Keypair();

  await delay(1000);

  const creators = [
    new Creator({
      address: creator.publicKey.toString(),
      share: 100,
      verified: 1,
    }),
  ];

  const data = new Data({
    symbol: "SYMBOL",
    name: "My NFT",
    uri: "https://arweave.net/FPGAv1XnyZidnqquOdEbSY6_ES735ckcDTdaAtI7GFw",
    sellerFeeBasisPoints: 100,
    creators,
  });

  await mintNFT(connection, creator, destinationUser.publicKey, data);
}

async function mintNFT(
  connection: Connection,
  creator: Keypair,
  user: PublicKey,
  data: Data
): Promise<void> {
  const mint = new Keypair();

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
  const assoc = await getAssociatedTokenAddress(mint.publicKey, user);

  // Create associated account for user
  const createAssocTokenAccountIx = createAssociatedTokenAccountInstruction(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mint.publicKey,
    assoc,
    user,
    creator.publicKey
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

  const recent = await connection.getRecentBlockhash();
  tx.recentBlockhash = recent.blockhash;
  tx.feePayer = creator.publicKey;

  tx.sign(mint, creator);

  const txSignature = await connection.sendRawTransaction(tx.serialize());

  console.log(txSignature);
}
