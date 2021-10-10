import classes from './QuoteItem.module.css';
import { Link,} from 'react-router-dom';

const QuoteItem = (props) => {
 
  const quoteDate = props.date;
   
  return (
    <li className={classes.item}>
      <figure>
        <p>{new Date(quoteDate).toLocaleDateString()}</p>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link to={`/quotes/${props.id}`} className='btn'>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
