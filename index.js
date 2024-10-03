import express from "express";
import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.static("./store"));
app.use(express.json());

function getFileExtension(file) {
  return file.originalname.split(".").pop();
}

function createUniqueFilename(file) {
  const existingFiles = fs.readdirSync("./store");
  let uniqueFilename;
  const extension = getFileExtension(file);

  do {
    const randomValue = Math.random().toString();
    const timestamp = Date.now();
    const hash = crypto.createHash("sha256").update(`${randomValue}${file.originalname}${timestamp}`).digest("hex").substring(0, 6);
    uniqueFilename = `${hash}.${extension}`;
  } while (existingFiles.includes(uniqueFilename));

  return uniqueFilename;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./store");
  },
  filename: (req, file, cb) => {
    cb(null, createUniqueFilename(file));
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  if (file) {
    const fileUrl = `http://localhost:${PORT}/${file.filename}`;
    return res.status(200).json({ message: "File uploaded successfully.", url: fileUrl });
  }

  res.status(400).json({ message: "Upload failed!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});