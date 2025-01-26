import { formatFileSize } from "../libs/formatFileSize.js";
import { fileModel } from "../Model/fileModel.js";

export async function upload(req, res){
    const file = req.file;
  
    if (file) {
      const fileUrl = `https://filenow-backend-production.up.railway.app/${file.filename}`;
      const downloadUrl = `https://filenow-backend-production.up.railway.app/download/${file.filename}`;
      const formattedSize = formatFileSize(file.size);
  
      return res.status(201).json({
        message: "File uploaded successfully.",
        file_url: fileUrl,
        download_url: downloadUrl,
      });
    }
  
    res.status(400).json({ message: "Upload failed!" });
  }
