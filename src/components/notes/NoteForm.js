import { useRef, useState, Fragment } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NoteForm.module.css";

const NoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  const removeFocusHandler = () => {
    setIsEntering(false);
  };

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if (enteredAuthor !== "" && enteredText !== "") {
      props.onAddNote({
        title: enteredAuthor,
        noteBody: enteredText,
        method: "post",
        id: Math.random(),
        date: new Date(),
      });
    } else {
      alert("Invalid Values");
    }
  }

  const focusHandler = () => {
    setIsEntering(true);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "If u leave then all your data will be lost,still u want to leave?"
        }
      />
      <Card>
        <form
          onFocus={focusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Topic</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={removeFocusHandler} className="btn">
              {" "}
              Add Note
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default NoteForm;
