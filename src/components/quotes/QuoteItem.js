import classes from './QuoteItem.module.css';
import { Link,} from 'react-router-dom';

const QuoteItem = (props) => {
 
  const quoteDate = props.date;
   
  return (
    <li className={classes.item}>
      <figure>
        {/* <p>{new Date(quoteDate).toLocaleDateString()}</p> */}
        <blockquote>
          <p>{props.author}</p>
        </blockquote>
        <figcaption>{new Date(quoteDate).toLocaleDateString()}</figcaption>
      </figure>
      <Link to={`/quotes/${props.id}`} className='btn'>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
