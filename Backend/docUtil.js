import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";
import fs from "fs";
const DocUtil = (function () {
  const _saveFilesToDir = async (files, dir) => {
    try {
      // Create the directory if it doesn't exist
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Save the files in the specified directory
      const saveFilesPromises = Promise.all(
        files.map(async (file, index) => {
          const fileName = `file_${index + 1}.pdf`;
          const filePath = path.join(dir, fileName);
          await fs.promises.writeFile(filePath, file.buffer);
          return fileName;
        })
      );

      return saveFilesPromises;
    } catch (error) {
      console.error("Error saving files:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const _getDocsFromDir = async (dir) => {
    //get all the files from a directory, returns a list of docs
    const directoryLoader = new DirectoryLoader(dir, {
      ".pdf": (path) => new PDFLoader(path),
    });
    const docs = await directoryLoader.load();
    return docs;
  };
  const _clearDir = async (dir) => {
    //deletes all the files that are present in a directory
    const directoryPath = path.join(dir);
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }
      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", filePath, err);
          } else {
            console.log("File deleted:", filePath);
          }
        });
      });
    });
  };
  return {
    saveFilesToDir: _saveFilesToDir,
    getDocsFromDir: _getDocsFromDir,
    clearDir: _clearDir,
  };
})();
export default DocUtil;
