import express, { Request, Response } from "express";
import cors from "cors";
import ytdl from "ytdl-core";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.post("/api/download", async (req: Request, res: Response) => {
  const { url, quality } = req.body;
  try {
    const videoInfo = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
      quality: quality || "highest",
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
