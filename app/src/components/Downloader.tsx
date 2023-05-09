import { HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import Loader from "./loader/Loader";

interface IDownloaderProps {
  thumbnail: string;
  title: string;
}

const Downloader: React.FC<IDownloaderProps> = ({ thumbnail, title }) => {
  return thumbnail && title ? (
    <HStack w="full" spacing={2} alignItems="flex-start" my={5}>
      <Image
        src={thumbnail && thumbnail}
        alt={title && title}
        w="40%"
        objectFit="cover"
      />
      <Text w="50%" fontSize="sm" fontWeight="semibold">
        {title && title}
      </Text>
    </HStack>
  ): <Loader />;
};

export default Downloader;
