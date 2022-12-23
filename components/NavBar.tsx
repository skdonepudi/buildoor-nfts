import { HStack, Spacer } from "@chakra-ui/react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { FC } from "react"
import styles from "../styles/Home.module.css"
import dynamic from "next/dynamic"
import { useWallet } from "@solana/wallet-adapter-react"
import {IoWalletOutline} from "react-icons/io5"

const WalletMultiButtonDynamic = dynamic(() => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton), { ssr: false })

const NavBar: FC = () => {
  const  wallet  = useWallet()

  return (
    <HStack width="full" padding={4} zIndex={40}>
      <Spacer />
      {
        wallet?.connected ? (
          <WalletMultiButton className={styles["wallet-adapter-button-trigger"]} />
        ) : (
          <WalletMultiButtonDynamic className={styles["wallet-adapter-button-trigger"]} >
           <IoWalletOutline size={20}/>&nbsp; Connect Wallet
            </WalletMultiButtonDynamic>
        )
      }
      
    </HStack>
  )
}

export default NavBar
