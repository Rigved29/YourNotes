import NotesList from "../components/notes/NotesList";
import { useEffect, useState } from "react";
// import { quoteContext } from "../context/context";
// import { useContext } from "react";
import Loader from "../components/UI/LoadingSpinner";

const AllNotes = () => {
  // console.log(quoteContext);
  // const [ctxQ, ChangeStateCtxQ, initial, changeInitial] =
  //   useContext(quoteContext);
  const [allNotes, setAllNotes] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true);
      try {
        // "http://localhost:8000/

        const response = await fetch(process.env.REACT_APP_API_URL);

        const resObj = await response.json();

        console.log(resObj);
        setIsLoading(false);
        let arr;
        if (response.ok) {
          arr = resObj.data.notes;
          console.log(arr);
          setAllNotes(arr);
        } else if (!response.ok) {
          throw new Error("Sorry not stable internet connection");
        }
      } catch (err) {
        setIsLoading(false);
        console.log(`I think your internet is not working: ${err}`);
        setError(true);
      }
    };

    getNotes();

    const date = new Date("July 20, 2020");
    console.log(
      date,
      "time:",
      date.getTime(),
      "day:",
      date.getDate(),
      "year:",
      date.getFullYear()
    );
    console.log(date.toLocaleDateString());
  }, []);

  return (
    <div>
      {!error && !isLoading && allNotes.length !== 0 && (
        <NotesList notes={allNotes} />
      )}{" "}
      {/*initial?allNotes:ctxQ.Quotes*/}
      {error && !isLoading && allNotes.length === 0 && (
        <h1>No Notes Found!! Check Your Internet Connection😌😌</h1>
      )}
      {!error && isLoading && allNotes.length === 0 && <Loader />}
    </div>
  );
};

export default AllNotes;
