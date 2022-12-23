import { Box, Center, color, Spacer, Stack, Text, Link, HStack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import NavBar from "../components/NavBar"
import Disconnected from "../components/Disconnected"
import { connected } from "process"
import { useWallet } from "@solana/wallet-adapter-react"
import Connected from "../components/Connected"
import { AiOutlineTwitter } from "react-icons/ai"

const Home: NextPage = () => {
  const {connected} = useWallet()
  return (
    <div className={styles.container}>
      <Head>
        <title>Galactic Guardians</title>
        <meta name="The NFT Collection for Galactic Guardians" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h="calc(100vh)"
        _before={{
          content: '""',
          bgImage:
            "url(images/bg.png)",
          bgSize: "cover",
          pos: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          opacity: 0.5,
          blur: "10px",
        }}
      >
        <Stack w="full" h="calc(100vh)" justify="center">
					{<NavBar />}

          <Spacer />
          <Center>
						{ connected ? <Connected/> : <Disconnected /> }
                </Center>
          <Spacer />

          <Center>
          
          <Box marginBottom={4} color="white" zIndex={30}>
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
            <Text>
             | built with &nbsp;
              <Link
                color="#00acee"
                href="https://twitter.com/_buildspace"
                isExternal
              >
                @_buildspace
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

export default Home