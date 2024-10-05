import fs from "fs";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function download (req, res){    
    try {
      const filePath = path.join(__dirname, '../store', req.params.filename);

      if (fs.existsSync(filePath)) {
        res.download(filePath);
      } else {
        res.status(404).send('File not found!');
      }
    } catch (err) {
      res.status(500).send('An error occurred!');
    }
}