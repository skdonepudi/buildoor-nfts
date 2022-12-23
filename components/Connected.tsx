import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react"
import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { PublicKey } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  Metaplex,
  walletAdapterIdentity,
  CandyMachine,
} from "@metaplex-foundation/js"
import { useRouter } from "next/router"

const Connected: FC = () => {
  const { connection } = useConnection()
  const walletAdapter = useWallet()
  const [candyMachine, setCandyMachine] = useState<CandyMachine>()
  const [isMinting, setIsMinting] = useState(false)

  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  }, [connection, walletAdapter])

  useEffect(() => {
   handleInitialLoad();
  }, [metaplex])


  const handleInitialLoad = useCallback(async () => {
    if (!metaplex || !walletAdapter.publicKey) return

    try {
      const candyMachine = await metaplex
        .candyMachines()
        .findByAddress({
          address: new PublicKey(
            process.env.NEXT_PUBLIC_CANDY_MACHINE_ADDRESS ?? ""
          ),
        })
        .run()

      const nfts = await metaplex
        .nfts()
        .findAllByOwner({ owner: walletAdapter.publicKey })
        .run()


      const nft = nfts.find(
        (nft) =>
          nft.collection?.address.toBase58() ===
          candyMachine.collectionMintAddress?.toBase58()
      )
      if (nft?.model === "metadata") {
        const metadata = await (await fetch(nft.uri)).json()
        router.push(
          `/stake?mint=${nft.mintAddress}&imageSrc=${metadata?.image}`
        )
        
      }
      

      setCandyMachine(candyMachine)
    } catch (error) {
      alert(error)
    }
  }, [metaplex, walletAdapter])


  const router = useRouter()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      console.log("clicked")
      if (event.defaultPrevented) return

      if (!walletAdapter.connected) {
        console.log("not connected")
        return
      }
      if ( !candyMachine) {
        console.log("no candy machine")
        return
      }

      try {
        setIsMinting(true)
        const nft = await metaplex.candyMachines().mint({ candyMachine }).run()

        router.push(`/newMint?mint=${nft.nft.address.toBase58()}`)
      } catch (error) {
        alert(error)
      } finally {
        setIsMinting(false)
      }
    },
    [metaplex, walletAdapter, candyMachine]
  )

  return (
    <VStack spacing={10} zIndex={20}>
      <Container>
        <VStack spacing={8}>
          <Heading
            color="white"
            as="h1"
            size="2xl"
            noOfLines={1}
            textAlign="center"
          >
            Welcome Guardian.
          </Heading>

          <Text color="bodyText" fontSize="xl" textAlign="center">
            Each NFT is randomly generated and can be staked to receive
            <Text as="b"> $GG</Text>. Use your <Text as="b"> $GG</Text> to
            upgrade your NFT and receive perks within the community!
          </Text>
        </VStack>
      </Container>

      <HStack spacing={5}>
        <Image boxSize={250} borderRadius={10} src="/images/01.png" alt="" />
        <Image boxSize={250} borderRadius={10} src="/images/02.png" alt="" />
        <Image boxSize={250} borderRadius={10} src="/images/03.png" alt="" />
        <Image boxSize={250} borderRadius={10} src="/images/04.png" alt="" />
        <Image boxSize={250} borderRadius={10} src="/images/05.png" alt="" />
      </HStack>

      <Button
        bgColor="#0000BB"
        color="white"
        maxW="380px"
        onClick={handleClick}
        isLoading={isMinting}
        _hover={{ bgColor: "#0000FF" }}
      >
        <Text>Mint Galactic Guardian</Text>
      </Button>
    </VStack>
  )
}

export default Connected