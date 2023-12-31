import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import DocDropZone from "@/components/DocDropZone/docDropZone";
import BasicAppShell from "@/components/appShell/appShell";
import Customize from "@/components/customize/customize";
import classes from "../styles/Index.module.css";
import { useEffect, useState } from "react";
export default function Home() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [files, setFiles] = useState([]);
  const [custObj, setCustObj] = useState({
    question: "",
    complexity: "medium", //default complexity is medium
  });
  const [answer, setAnswer] = useState<string>("");
  console.log(custObj.question);
  useEffect(() => {
    if (custObj.question.trim().length !== 0) {
      const formData = new FormData();
      // files is an array of file objects
      files.forEach((file, index) => {
        formData.append(`files`, file);
      });
      // Custobj is used to send question and metaData about file
      formData.append("custObj", JSON.stringify(custObj));

      fetch("http://localhost:8080/getQA", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAnswer(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    console.log(files);
    console.log(custObj);
  }, [custObj]);
  function setCustomizationData(data: any) {
    setCustObj(data);
  }
  return (
    <MantineProvider>
      <BasicAppShell>
        {currentPage === "Home" && (
          <div className={classes.content}>
            <div className={classes.textinfo}>
              <h2>Create Q/A for your Documents</h2>
              <p>
                DataQuest provides you an easy way to create Q/A for your files
                using vector embeddings.
                <br />
                Just Upload the files for dataset and we'll do the rest
              </p>
            </div>
            <DocDropZone
              setCurrentPage={setCurrentPage}
              setFiles={setFiles}
            ></DocDropZone>
          </div>
        )}
        {currentPage === "Customize" && (
          <div className="customize">
            <Customize
              setCustomizationData={setCustomizationData}
              answer={answer}
            ></Customize>
            {/* {Object.keys(custObj).length !== 0 && (
              <p>{Object.keys(custObj).length}</p>
            )} */}
          </div>
        )}
      </BasicAppShell>
    </MantineProvider>
  );
}
