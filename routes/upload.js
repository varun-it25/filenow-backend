import { formatFileSize } from "../libs/formatFileSize.js";
import { fileModel } from "../Model/fileModel.js";

export async function upload(req, res){
    const file = req.file;
  
    if (file) {
      const fileUrl = `https://filenow-production.up.railway.app/${file.filename}`;
      const downloadUrl = `https://filenow-production.up.railway.app/${file.filename}`;
      const formattedSize = formatFileSize(file.size);

      const data = new fileModel({
          file_name: file.filename,
          file_size: formattedSize,
          file_url: fileUrl,
          download_url: downloadUrl
      });
      await data.save();
  
      return res.status(200).json({
        message: "File uploaded successfully.",
        file_url: fileUrl,
        download_url: downloadUrl,
      });
    }
  
    res.status(400).json({ message: "Upload failed!" });
  }
