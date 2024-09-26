import toast from "react-hot-toast";
import { baseURL } from "./utils/axios";
import axios from "axios";
import { useState } from "react";
import {
  Container,
  Center,
  Heading,
  VStack,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  HStack,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";

const App = () => {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    console.log("clicked");
    const videoUrl = url.trim();
    if (!videoUrl || videoUrl === "")
      return toast.error("Please input video url");

    setLoading(true);
    try {
      const { data } = await axios.post(`${baseURL}/api/download`, {
        url: videoUrl,
      });
      window.open(data?.download, "_blank");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container w="400px" h="auto" mx="auto" p={4}>
        <Center>
          <Image w="16" alt="logo" src="/icon.png" />
        </Center>
        <Heading textAlign="center" fontWeight="semibold" fontSize="lg" mt={1}>
          Video Downloader
        </Heading>
        <Text fontSize="xs" fontWeight="light" textAlign="center" mb={3}>
          Awesome any video downloader
          <br /> google chrome extension
        </Text>
        <VStack>
          {/* <HStack>
            <IconButton
              size="xs"
              rounded="full"
              as={BsFacebook}
              aria-label="facebook"
            />
            <IconButton
              size="xs"
              rounded="full"
              as={BsInstagram}
              aria-label="facebook"
            />
            <IconButton
              size="xs"
              rounded="full"
              as={BsTwitter}
              aria-label="facebook"
            />
            <IconButton
              size="xs"
              rounded="full"
              as={BsYoutube}
              aria-label="facebook"
            />
          </HStack> */}
          <InputGroup
            w="full"
            py={1}
            border="2px"
            borderColor="orange.100"
            rounded="md"
          >
            <Input
              pr={24}
              pl={3}
              py={3}
              variant="unstyled"
              onChange={(e: any) => setUrl(e.target.value)}
              type="text"
              placeholder="Video url"
              fontSize="md"
            />
            <InputRightElement h="full" w="28" p={1}>
              <Button
                onClick={handleSubmit}
                colorScheme="orange"
                fontSize="sm"
                fontWeight="semibold"
                w="full"
                h="full"
              >
                {loading ? <Spinner /> : "Download"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>

        <HStack
          w="full"
          textAlign="center"
          fontWeight="semibold"
          mt={3}
          justify="center"
        >
          <Text>Created by </Text>
          <Text
            cursor="pointer"
            color="green"
            textDecor="underline"
            onClick={() => window.open("https://github.com/devlopersabbir")}
          >
            @devlopersabbir
          </Text>
        </HStack>
      </Container>
    </>
  );
};
export default App;
