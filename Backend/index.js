import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import Docutil from "./docUtil.js";
import LangchainUtil from "./langchainUtil.js";

dotenv.config();

const PORT = process.env.PORT | 8080;
const app = express();
app.use(cors());
app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/getQA", upload.array("files"), async (req, res) => {
  const files = req.files;
  console.log(files);
  const custObj = JSON.parse(req.body.custObj);
  //save the files in server
  await Docutil.saveFilesToDir(files, "src");
  //read documents from server directory
  const dirDocs = await Docutil.getDocsFromDir("src");
  console.log(dirDocs);
  //   construct embeddings using directory Docs
  console.log("Uploaded files:", files);
  await LangchainUtil.createAndStoreEmbeddings(dirDocs);
  //construct query string to create query vector
  //   const promptStr = await CommonUtil.constructPromptStr(custObj);
  //Run DB QA chain
  console.log("Customization data:", custObj);
  const results = await LangchainUtil.promptQAFromEmbeddings(
    custObj.question,
    custObj.complexity
  );
  console.log(results);
  // Delete the files present in Dir
  await Docutil.clearDir("src");
  //return the results
  return res.status(200).json({ data: results });
});

app.listen(PORT, () => {
  console.log("listening for requests");
});
