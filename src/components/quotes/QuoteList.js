import { Fragment} from 'react';
import { useHistory,useLocation,} from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascdending)=>{

  return quotes.sort((quoteA,quoteB)=>{
    let dateA = quoteA.date;
    let dateB = quoteB.date;

    if(ascdending){
      return Date.parse(dateA) > Date.parse(dateB)? 1:-1;
      } else{
       return Date.parse(dateA) < Date.parse(dateB)?1:-1;
      }

    //  if(ascdending){
    //   return dateA.getTime() > dateB.getTime()? 1:-1;
    //   } else{
    //    return dateA.getTime() < dateB.getTime()?1:-1;
    //   }
  });
};

const QuoteList = (props) => {

  const history = useHistory();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams.get("sort"),props.quotes,"yhi h");

  const isAscending = queryParams.get("sort") === 'asc';

  console.log(props.quotes[0].id<props.quotes[1].id);
  
const  sortedQuotes = sortQuotes(props.quotes,isAscending);

  const changeSortingHandler =()=>{

    console.log("click");
    history.push(`${location.pathname}?sort=${isAscending?"desc":"asc"}`); /* in history.push() we can also pass an object having pathname and search as different values*/
    console.log(location);

  }

  const searchTopicsHandler = (e) =>{
    console.log(e.target.value);
  }

  

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>sort {isAscending? "Latest":"old"}</button>
        <input type="text" placeholder="Search Topics.." className={classes.search} onChange={searchTopicsHandler}/>
      </div>
      
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
            date={quote.date}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
