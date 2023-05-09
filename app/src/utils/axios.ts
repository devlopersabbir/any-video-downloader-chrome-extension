import axios from "axios";

export const baseURL = "http://localhost:5000";
export const ORIGIN_URL = "http://localhost:5173";
export const YOUTUBE_API_KEY = "AIzaSyBA4OQ9i11REqdtOOMYiHkiA3UdQMB0AsE";
export const youTubeBaseUrl = "https://www.googleapis.com/youtube/v3";

export const apiRequest = axios.create({
  baseURL: youTubeBaseUrl,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": ORIGIN_URL,
  },
});
