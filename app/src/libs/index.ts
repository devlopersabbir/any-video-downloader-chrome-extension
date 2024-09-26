import axios from "axios";

// Define a generic ResponseType interface for flexibility
interface ResponseType<T> {
  data: T;
}

export const getYoutTubeAPIKey = async (): Promise<string> => {
  const response: ResponseType<GetAPIKeyResponseData> = await axios.get(
    "https://any-video-downloader-chrome-extension.vercel.app/api/download/paid/api/youtube/key/here/for/sabbir"
  );

  // Assuming the response data has an `api_key` property (check actual API response)
  // Handle potential errors using try-catch or nullish coalescing operator (??)
  return response.data?.api_key;
};

// Define an interface for the expected response data structure (optional)
interface GetAPIKeyResponseData {
  api_key: string;
}
