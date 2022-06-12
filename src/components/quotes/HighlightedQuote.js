import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  return (
    <figure className={classes.quote}>
      <figcaption>{props.title}</figcaption>
      <p>{props.noteBody}</p>
    </figure>
  );
};

export default HighlightedQuote;
