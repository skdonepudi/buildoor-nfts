import { PublicKey } from "@solana/web3.js";

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_STAKE_PROGRAM_ID ??
    "gWgQf6CvNpP2VZ1Rm4xM3NiSp9NUcArx2VWTebycuMv"
);

export const STAKE_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_STAKE_MINT_ADDRESS ??
    "Fjo1s6WaazpGfx7YASm8E93eUv4oi3Y8F5aRNdY7YhER"
);
