import { useState } from "react";
import classes from "./Customize.module.css";
export default function Customize(props: any) {
  const [currentBtn, setCurrentBtn] = useState(-1);
  const diffValues = ["Easy", "Medium", "Hard"];
  const [question, setQuestion] = useState("");
  function submitForm() {
    const custObj = {
      complexity: currentBtn > 0 ? diffValues[currentBtn] : "Medium",
      question: question,
    };
    props.setCustomizationData(custObj);
  }
  return (
    <div>
      <div className={classes.form}>
        <div className={classes.formElement}>
          <p className={classes.formLabel}>
            Specify the Question to be Answered{" "}
          </p>
          <input
            type="text"
            value={question}
            className={classes.nosInput}
            onChange={(event) => setQuestion(event.target.value)}
          />
        </div>
        <div className={classes.formElement}>
          <p className={classes.formLabel}>
            Specify the complexity of the Answer to be generated
          </p>
          <div className={classes.genreButtons}>
            {diffValues.map((value, index) => {
              return (
                <button
                  key={index}
                  className={classes.genreButton}
                  type="button"
                  style={{
                    backgroundColor: `${
                      index === currentBtn ? "Yellow" : "Pink"
                    }`,
                  }}
                  onClick={() => setCurrentBtn(index)}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={submitForm}
          className={classes.submitButton}
        >
          Submit
        </button>
        <div className={classes.formElement}>
          <p className={classes.formLabel}>Answer to Given Question </p>
          <textarea
            name="answer"
            id="answer"
            cols={60}
            rows={10}
            value={`${props.answer ? props.answer.data.text : ""}`}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
