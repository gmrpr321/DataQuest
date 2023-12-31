import { useState } from "react";
import { Input } from "@mantine/core";
import classes from "./Customize.module.css";
interface label {
  title: string;
  index: number;
}
export default function Customize(props: any) {
  //   const [cust, setCust] = useState({});
  //   const [submit, setSubmit] = useState(false);
  const [labels, setLabels] = useState<string[]>([]);
  const [currentLabel, setCurrentLabel] = useState<string>("");
  const [currentBtn, setCurrentBtn] = useState(-1);
  const [currentType, setCurrentType] = useState(-1);
  const [nos, setNos] = useState<number>(0);
  const diffValues = ["Easy", "Medium", "Hard"];
  const typeValues = ["Essay Type", "MCQ Type"];
  function addLabel() {
    if (currentLabel !== "") {
      setLabels((values) => [...values, currentLabel]);
      setCurrentLabel("");
    }
  }
  function removeLabel(element: string) {
    setLabels((labels) => {
      return labels.filter((item) => item !== element);
    });
  }
  function submitForm() {
    const custObj = {
      labels: labels,
      complexity: currentBtn > 0 ? diffValues[currentBtn] : "Medium",
      type: currentType > 0 ? typeValues[currentType] : "Essay Type",
      nos: nos,
    };
    props.setCustomizationData(custObj);
  }
  return (
    <div>
      <div className={classes.form}>
        <div className={classes.formElement}>
          <h2>Customize the results</h2>
          <p className={classes.formLabel}>
            Select the topics that should be focused,Click on selected topics to
            remove them.
          </p>
          <div className={classes.selectedLabels}>
            {labels.length !== 0 &&
              labels.map((element: string, index) => {
                return (
                  <div
                    key={index}
                    className={classes.labelElement}
                    onClick={removeLabel.bind(null, element)}
                  >
                    {element}
                  </div>
                );
              })}
            {labels.length === 0 && (
              <p className={classes.defaultText}>Selected Lables</p>
            )}
          </div>
          <div className={classes.inputLabel}>
            <input
              type="text"
              value={currentLabel}
              onChange={(event) => setCurrentLabel(event.target.value)}
            />
            <button type="button" onClick={addLabel}>
              Add Title
            </button>
          </div>
        </div>
        <div className={classes.formElement}>
          <p className={classes.formLabel}>
            Specify the complexity of the questions to be generated
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
        <div className={classes.formElement}>
          <p className={classes.formLabel}>
            Specify the number of Questions to be generated{" "}
          </p>
          <input
            type="number"
            value={nos}
            className={classes.nosInput}
            onChange={(event) => setNos(parseInt(event.target.value, 10))}
          />
        </div>
        <div className={classes.formElement}>
          <p className={classes.formLabel}>Specify Result Format</p>
          <div className={classes.TypeButtons}>
            {typeValues.map((value, index) => {
              return (
                <button
                  key={index}
                  className={classes.TypeButton}
                  type="button"
                  style={{
                    backgroundColor: `${
                      index === currentType ? "Yellow" : "Pink"
                    }`,
                  }}
                  onClick={() => setCurrentType(index)}
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
      </div>
    </div>
  );
}
