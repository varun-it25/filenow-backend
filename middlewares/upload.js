import multer from "multer";
import { createUniqueFilename } from "../libs/createUniqueFilename.js";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dirPath = path.join(__dirname, '../store');
      cb(null, dirPath);
    },
    filename: (req, file, cb) => {
      cb(null, createUniqueFilename(file));
    },
});
  
export const uploadMiddleware = multer({ storage }).single("file");