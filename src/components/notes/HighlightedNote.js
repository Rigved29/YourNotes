import classes from "./HighlightedNote.module.css";

const HighlightedNote = (props) => {
  return (
    <figure className={classes.note}>
      <figcaption>{props.title}</figcaption>
      <p>{props.noteBody}</p>
    </figure>
  );
};

export default HighlightedNote;
