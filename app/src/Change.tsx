import Downloader from "./components/Downloader";
import toast from "react-hot-toast";
import { baseURL, youTubeBaseUrl } from "./utils/axios";
import axios from "axios";
import { FiDownload } from "react-icons/fi";
import Loader from "./components/loader/Loader";
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
  Select,
  Icon,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";

const Change = () => {
  const YOUTUBE_API_KEY: string = "AIzaSyBA4OQ9i11REqdtOOMYiHkiA3UdQMB0AsE";
  const [url, setUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoThumb, setVideoThumb] = useState<string>("");
  const [quality, setQuality] = useState<string>("");

  const handleSubmit = async () => {
    const videoUrl = url.trim();
    if (!videoUrl || videoUrl === "")
      return toast.error("Please input video url");

    const videoIdMatch = videoUrl.match(/(?:v=)([\w-]+)/);
    if (!videoIdMatch) return toast.error("Video id not found!");
    setVideoId(videoIdMatch[1]);

    setLoading(true);
    try {
      const { data } = await axios.get(
        `${youTubeBaseUrl}/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`
      );
      const sninnet = data?.items[0]?.snippet;
      if (sninnet) {
        setVideoTitle(sninnet?.title);
        setVideoThumb(sninnet?.thumbnails?.default?.url);
        toast.success("Video got it");
      }
    } catch (error: any) {
      if (!error?.response) return toast.error("Something went wrong!");
      const message = error?.response?.data?.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    try {
      const { data } = await axios.post(`${baseURL}/api/download`, {
        url: videoUrl,
        quality,
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
        <Heading textAlign="center" fontWeight="semibold" fontSize="lg" mt={2}>
          YouTube Video Downloader
        </Heading>
        <Text fontSize="xs" fontWeight="light" textAlign="center" mb={3}>
          Awesome youtube video downloader
          <br /> google chrome extension
        </Text>
        <VStack>
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
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>

        {loading ? (
          <Loader />
        ) : videoTitle && videoThumb ? (
          <>
            <Downloader thumbnail={videoThumb} title={videoTitle} />
            <>
              <HStack spacing={2}>
                <Select
                  w="60%"
                  onChange={(e) => setQuality(e.target.value)}
                  placeholder="Select quality"
                >
                  <option value="highest">1080P</option>
                  <option value="highestaudio">1080P Audio</option>
                  <option value="highestvideo">1080P Video</option>
                  <option value="lowest">720P</option>
                  <option value="lowestaudio">720P Auto</option>
                  <option value="lowestvideo">720P Video</option>
                </Select>
                <Button
                  w="40%"
                  onClick={handleDownload}
                  colorScheme="messenger"
                  rightIcon={<Icon as={FiDownload} />}
                >
                  {loading ? <Spinner /> : "Download"}
                </Button>
              </HStack>
            </>
          </>
        ) : null}
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
            onClick={() =>
              window.open("https://www.showwcase.com/devlopersabbir")
            }
          >
            @devlopersabbir
          </Text>
        </HStack>
      </Container>
    </>
  );
};
export default Change;
