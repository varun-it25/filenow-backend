import fs from "fs"
import crypto from "crypto"
import { getFileExtension } from "./getFileExtension.js";

export function createUniqueFilename(file) {
    const existingFiles = fs.readdirSync("./store");
    const extension = getFileExtension(file);
    let uniqueFilename;
  
    do {
      const randomValue = Math.random().toString();
      const timestamp = Date.now();
      const hash = crypto.createHash("sha256").update(`${randomValue}${file.originalname}${timestamp}`).digest("hex").substring(0, 8);
      uniqueFilename = `${hash}.${extension}`;
    } while (existingFiles.includes(uniqueFilename));
  
    return uniqueFilename;
  }