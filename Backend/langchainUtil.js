import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAI } from "langchain/llms/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import dotenv from "dotenv";
dotenv.config();

const LangchainUtil = (function () {
  const _createAndStoreEmbeddings = async (docs) => {
    const pinecone = new Pinecone({
      environment: "gcp-starter",
      apiKey: process.env.PINECONE_API_KEY,
    });

    const pineconeIndex = pinecone.Index("qadocs");
    const openAIApiKey = process.env.OPENAI_KEY;
    //embeddings created using openai's embedding model
    const embeddings = new OpenAIEmbeddings({ openAIApiKey: openAIApiKey });
    //documents is split into multiple chunks to reduce prompt size
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1024,
      chunkOverlap: 1,
    });
    const splitDocs = await splitter.splitDocuments(docs);
    //storing documents to pinecone DB
    await PineconeStore.fromDocuments(splitDocs, embeddings, {
      pineconeIndex,
      maxConcurrency: 5, //max concurrent executions
    });
  };
  const _promptQAFromEmbeddings = async (queryStr, complexity) => {
    const openai = new OpenAI({
      openAIApiKey: process.env.OPENAI_KEY,
    });
    const pinecone = new Pinecone({
      environment: "gcp-starter",
      apiKey: PINECONE_API_KEY,
    });
    const pineconeIndex = pinecone.Index("qadocs");
    const memory = new BufferMemory({
      memoryKey: "chat_history",
      returnMessages: true,
    });
    const openAIApiKey = process.env.OPENAI_KEY;
    const embeddings = new OpenAIEmbeddings({ openAIApiKey: openAIApiKey });
    //creates vector store of pinecone db
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
    });
    const chain = ConversationalRetrievalQAChain.fromLLM(
      openai,
      vectorStore.asRetriever(),
      {
        memory,
      }
    );
    console.log(queryStr);
    const result = await chain.call({
      question: `Give answer to the question in specified complexity
                Question : ${queryStr}
                Complexity : ${complexity}`,
    });
    console.log(result);
    return result;
  };
  const _deleteStoreData = async (pineconeStore, docIds) => {
    //used to delete redundant store DB data
    await pineconeStore.delete({
      ids: docIds,
    });
    return;
  };
  return {
    createAndStoreEmbeddings: _createAndStoreEmbeddings,
    promptQAFromEmbeddings: _promptQAFromEmbeddings,
    deleteStoreData: _deleteStoreData,
  };
})();
export default LangchainUtil;
