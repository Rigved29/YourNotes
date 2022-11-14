import { Fragment, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Decide from "./Decide";
import NoteItem from "./NoteItem";
import classes from "./NotesList.module.css";

const sortnotes = (notes, ascdending) => {
  if (notes.length !== 0) {
    return notes.sort((quoteA, quoteB) => {
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

const NoteList = (props) => {
  let [initial, setInitial] = useState(true);
  const [q, setQ] = useState(props.notes);

  if (initial && q !== props.notes) {
    setQ(props.notes);
  }

  const history = useHistory();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isAscending = queryParams.get("sort") === "asc";

  const sortedNotes = sortnotes(props.notes, isAscending);

  const changeSortingHandler = () => {
    history.push(
      `${location.pathname}?sort=${isAscending ? "desc" : "asc"}`
    ); /* in history.push() we can also pass an object having pathname and search as different values*/

    setQ(sortedNotes);
    setInitial(false);
  };

  const searchTopicsHandler = (e) => {
    setInitial(false);
    const filterArr = sortedNotes.filter((el) =>
      el.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setQ(filterArr);
  };

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
          q.map((note) => (
            <NoteItem
              key={note._id}
              id={note._id}
              title={note.title}
              noteBody={note.noteBody}
              date={note.date}
            />
          ))
        ) : (
          <Decide initial={initial} />
        )}
      </ul>
    </Fragment>
  );
};

export default NoteList;
