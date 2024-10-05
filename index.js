import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./connection.js";
import { upload } from "./routes/upload.js";
import { download } from "./routes/download.js";
import { uploadMiddleware } from "./middlewares/upload.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const DB_STR = process.env.DB_STR;
const app = express();

connection(DB_STR);

app.use(express.static("./store"));
app.use(cors());
app.use(express.json());

app.post("/upload", uploadMiddleware, upload);
app.get('/download/:filename', download);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});