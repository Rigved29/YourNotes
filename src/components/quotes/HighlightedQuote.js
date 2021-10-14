import classes from './HighlightedQuote.module.css';

const HighlightedQuote = (props) => {
  return (
    <figure className={classes.quote}>
      <figcaption>{props.author}</figcaption>
      <p>{props.text}</p>
    </figure>
  );
};

export default HighlightedQuote;
