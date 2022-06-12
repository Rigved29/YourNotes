import { Fragment, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Decide from "./Decide";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascdending) => {
  if (quotes.length !== 0) {
    return quotes.sort((quoteA, quoteB) => {
      let dateA = quoteA.date;
      let dateB = quoteB.date;

      if (ascdending) {
        return Date.parse(dateA) > Date.parse(dateB) ? 1 : -1;
      } else {
        return Date.parse(dateA) < Date.parse(dateB) ? 1 : -1;
      }
    });
  } else {
    return [];
  }
};

const QuoteList = (props) => {
  let [initial, setInitial] = useState(true);
  const [q, setQ] = useState(props.quotes);

  if (initial && q !== props.quotes) {
    setQ(props.quotes);
  }

  const history = useHistory();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams.get("sort"), props.quotes, "yhi h");

  const isAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isAscending);

  const changeSortingHandler = () => {
    console.log("click");
    history.push(
      `${location.pathname}?sort=${isAscending ? "desc" : "asc"}`
    ); /* in history.push() we can also pass an object having pathname and search as different values*/
    console.log(location);
    setQ(sortedQuotes);
    setInitial(false);
  };

  const searchTopicsHandler = (e) => {
    console.log(e.target.value);
    setInitial(false);
    const filterArr = sortedQuotes.filter((el) =>
      el.title.includes(e.target.value)
    );
    console.log(filterArr);
    setQ(filterArr);
  };

  console.log(q, props.quotes);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          sort {isAscending ? "Latest" : "old"}
        </button>
        <input
          type="text"
          placeholder="Search Topics.."
          className={classes.search}
          onChange={searchTopicsHandler}
        />
      </div>

      <ul className={classes.list}>
        {q.length !== 0 ? (
          q.map((quote) => (
            <QuoteItem
              key={quote._id}
              id={quote._id}
              title={quote.title}
              noteBody={quote.noteBody}
              date={quote.date}
            />
          ))
        ) : (
          <Decide initial={initial} />
        )}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
