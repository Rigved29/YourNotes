import classes from "./QuoteItem.module.css";
import { Link } from "react-router-dom";

const QuoteItem = (props) => {
  const quoteDate = props.date;

  console.log(props);

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.title}</p>
        </blockquote>
        <figcaption>
          {quoteDate ? quoteDate.slice(0, 10) : "No date mentioned"}
        </figcaption>
      </figure>
      <Link to={`/quotes/${props.id}`} className={classes.btns}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
