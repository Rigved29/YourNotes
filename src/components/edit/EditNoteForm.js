import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import classes from "./EditNoteForm.module.css";

const EditNoteForm = (props) => {
  const [topicState, setTopicState] = useState("");
  const [textState, setTextState] = useState("");

  const textRef = useRef();
  const topicRef = useRef();

  const history = useHistory();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const submitEdit = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${props.uID}/`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: topicState,
            noteBody: textState,
            date: new Date(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = await response.json();

      if (data.status === "success") {
        history.push("/allnotes");
      }

      console.log(data);
    };

    // optional: Could validate here
    if (topicState !== "" && textState !== "") {
      console.log({ topic: topicState, text: textState });
      try {
        submitEdit();
      } catch (err) {
        console.log(err);
      }
    }

    // send comment to server
  };
  console.log(props.author, props.text);

  // setTopicState(props.author);
  // setTextState(props.text);
  const topicHandler = (e) => {
    console.log(topicRef.current.value);
    setTopicState(topicRef.current.value);
  };

  const textHandler = (e) => {
    console.log(textRef.current.value);
    setTextState(textRef.current.value);
  };

  useEffect(() => {
    setTopicState(props.author);
    setTextState(props.text);
  }, []);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Topic</label>
        <textarea
          id="comment"
          rows="2"
          ref={topicRef}
          value={topicState}
          className={classes.m}
          onChange={topicHandler}
        ></textarea>
        <label htmlFor="comment">Text</label>
        <textarea
          id="comment"
          rows="5"
          ref={textRef}
          value={textState}
          onChange={textHandler}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Submit</button>
      </div>
    </form>
  );
};

export default EditNoteForm;
