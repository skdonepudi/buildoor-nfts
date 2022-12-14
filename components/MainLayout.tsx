import { FC, ReactNode } from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { Box, Center, Spacer, Stack, Text, Link, Flex, HStack } from "@chakra-ui/react"
import NavBar from "./NavBar"
import { useWallet } from "@solana/wallet-adapter-react"
import {AiOutlineTwitter} from "react-icons/ai"

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { connected } = useWallet()

  return (
    <div className={styles.container}>
      <Head>
        <title>Galactic Guardians</title>
        <meta name="The NFT Collection for Galactic Guardians" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h={{
          base: "full",
          md: "100vh",

        }}
        _before={{
          
          content: '""',
          bgImage:
            "url(images/bg.png)",
          bgSize: "cover",
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          opacity: 0.4,     }}

      >
        <Stack w="full" h="full" spacing={2} zIndex={10}>
          <NavBar />

          <Spacer />

          <Center >{children}</Center>

          <Spacer />

          <Center>
          <Box marginBottom={4} color="white" zIndex={20}>
          <HStack >
            <Text>
              <AiOutlineTwitter  color="#00acee"/>
            </Text>
            <Text as="span">
              Follow me on twitter&nbsp;
              <Link
                color="#00acee"
                href="https://twitter.com/skdonepudi"
                isExternal
              >
                @skdonepudi 
              </Link>
            </Text>
            <Text display={{
              base:"none",
              md:"block"
            }}>
             | built with &nbsp;
              <Link
                color="#00acee"
                href="https://twitter.com/_buildspace" 
                isExternal
              >
                @_buildspace 💙
              </Link>
            </Text>
                </HStack>
              </Box>
          </Center>
        </Stack>
      </Box>
    </div>
  )
}

export default MainLayout