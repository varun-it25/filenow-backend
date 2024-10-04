import express from "express";
import multer from "multer";
import crypto from "crypto";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import { connection } from "./connection.js";
import { fileModel } from "./Model/fileModel.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const DB_STR = process.env.DB_STR;
const app = express();

connection(DB_STR);

app.use(express.static("./store"));
app.use(cors());
app.use(express.json());

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes.toFixed(2)} bytes`;
  } else if (bytes < 1048576) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / 1048576).toFixed(2)} MB`;
  }
}

function getFileExtension(file) {
  return file.originalname.split(".").pop();
}

function createUniqueFilename(file) {
  const existingFiles = fs.readdirSync("./store");
  const extension = getFileExtension(file);
  let uniqueFilename;

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

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (file) {
    const fileUrl = `https://filenow.onrender.com/${file.filename}`;
    const downloadUrl = `https://filenow.onrender.com/download/${file.filename}`;
    const fileSizeInBytes = file.size;
    const formattedSize = formatFileSize(fileSizeInBytes);
    const sizeValue = parseFloat(formattedSize.split(" ")[0]);
    const unit = formattedSize.split(" ").pop();

    if (sizeValue > 10 && unit === "MB") {
      fs.unlinkSync(`./store/${file.filename}`);
      return res.status(400).json({ message: "File size is too large." });
    }
    
    else {
      const userData = { file_name: file.filename, file_size: formattedSize, file_url: fileUrl, download_url: downloadUrl };
      const data = new fileModel(userData);
      await data.save();

      return res.status(200).json({
        message: "File uploaded successfully.",
        file_url: fileUrl,
        download_url: downloadUrl,
      });
    }
  }

  res.status(400).json({ message: "Upload failed!" });
});

app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  
  try {
    if (fs.existsSync(`./store/${filename}`)) {
      res.status(200).download(`./store/${ filename }`);
    }  else {
      res.status(404).send('File not found!');
    }
  } catch (err) {
    res.status(500).send('An error occurred!');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});