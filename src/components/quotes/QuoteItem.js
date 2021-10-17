import classes from './QuoteItem.module.css';
import { Link,} from 'react-router-dom';

const QuoteItem = (props) => {
 
  const quoteDate = props.date;
   
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.author}</p>
        </blockquote>
        <figcaption>{new Date(quoteDate).toLocaleDateString()}</figcaption>
      </figure>
      <Link to={`/quotes/${props.id}`} className={classes.btns}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
