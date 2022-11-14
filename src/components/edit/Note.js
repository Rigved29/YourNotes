import { useState } from "react";

import classes from "./Note.module.css";
import EditNoteForm from "./EditNoteForm";

const EditNote = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.editNote}>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Edit
        </button>
      )}
      {isAddingComment && (
        <EditNoteForm
          text={props.noteBody}
          author={props.title}
          uID={props.uID}
        />
      )}
    </section>
  );
};

export default EditNote;
