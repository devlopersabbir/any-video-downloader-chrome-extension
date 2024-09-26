import express, { Request, Response } from "express";
import cors from "cors";
import ytdl from "ytdl-core";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json({
    apifor: "Youtube video downloader api",
    creator: "Sabbir Hossain Shuvo",
    username: "devlopersabbir",
    github: "https://github.com/devlopersabbir",
    email: "devlopersabbir@gmail.com",
    facebook: "https://facebook.com/devlopersabbir",
    buymeacoffee: "https://buymeacoffee.com/devlopersabbir",
  });
});

app.get("/api/download/paid", (req, res) => {
  const apiKey = process.env.YOUTUBE_API_KEY;

  res
    .status(200)
    .json({ message: "api key here", api_key: apiKey ?? "not found!" });
});
app.post("/api/download", async (req: Request, res: Response) => {
  const { url, quality } = req.body;
  try {
    const videoInfo = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
      quality: quality || "highestvideo",
      filter: "videoandaudio",
    });
    res.status(200).json({
      message: "Download video url got it!",
      download: videoFormat.url,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => console.log("Server is runnign!"));
export default app;
