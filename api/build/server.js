"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.post("/api/download", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, quality } = req.body;
    try {
        const videoInfo = yield ytdl_core_1.default.getInfo(url);
        const videoFormat = ytdl_core_1.default.chooseFormat(videoInfo.formats, {
            quality: quality || "highest",
            filter: "videoandaudio",
        });
        res.status(200).json({
            message: "Download video url got it!",
            download: videoFormat.url,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
app.listen(5000, () => console.log("Server is runnign!"));
//# sourceMappingURL=server.js.map