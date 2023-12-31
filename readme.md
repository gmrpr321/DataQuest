# DataQuest

DataQuest is a Web Application that implements a Q/A Bot from the given PDF documents using vector embeddings.

    Working Demonstration Video with summary is present in docs folder

## Technology used

- OpenAI's text embedding model (text-embedding-ada-002)
- Langchain framework
- Pinecone vector database
- PDFParse for parsing PDF files
- Multer for directory and file manipulation
- NextJs for frontEnd
- Mantine v7 library

## Features

- Supports reading from multiple PDFs
- Can provide answer from PDF in real time
- Can modify the complexity of generated answer (**_Bonus Feature !!_**)

## Installation - (BackEnd)

clone this repo and perform these steps to set up backend server

Change to backend directory

```
cd backend
```

Install dependencies

```
npm install
```

Run local server

```
npm run dev
```

## Installation - (FrontEnd)

clone this repo and perform these steps to set up FrontEnd server

Change to frontend directory

```
cd frontEnd
```

Install dependencies

```
npm install
```

Run local Frontend server

```
npm run dev
```

(Ensure the request URL matches the URL of Local server)

# Steps to use the project

- Open the local deployed website
- Upload the required PDF documents
- specify the complexity of the question (Easy,medium,hard)
- Ask the question to Q/A bot
- Answer will be generated within a few seconds

## Module Descriptions

## LangchainUtil.js

This module encapsulates utility functions related to the Langchain library, including creating and storing document embeddings, querying a QA chain, and managing data in Pinecone.

### createAndStoreEmbeddings(docs: Array<string>): Promise<void>

Creates and stores document embeddings in Pinecone database.

docs: An array of strings representing the documents.

### promptQAFromEmbeddings(queryStr: string, complexity: string): Promise<any>

Prompts a question-answer chain based on document embeddings.

queryStr: The question string for the QA chain.
complexity: The specified complexity level for the question.

### deleteStoreData(pineconeStore: any, docIds: Array<string>): Promise<void>

Deletes redundant data from the Pinecone store database.

pineconeStore: The Pinecone store instance.
docIds: An array of document IDs to be deleted.

## docUtil.js

This module provides utility functions for handling documents, such as saving files to a directory, retrieving documents from a directory, and clearing a directory.

### saveFilesToDir(files: Array<File>, dir: string): Promise<Array<string>>

Saves files to a specified directory on the server.

### getDocsFromDir(dir: string): Promise<Array<Document>>

Retrieves documents from a specified directory.

### clearDir(dir: string): Promise<void>

Deletes all files in a specified directory.
Returns a promise that resolves once the directory is cleared.
