import NotesList from "../components/notes/NotesList";
import { useEffect, useState } from "react";
import Loader from "../components/UI/LoadingSpinner";

const AllNotes = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_API_URL);

        const resObj = await response.json();

        setIsLoading(false);
        let arr;
        if (response.ok) {
          arr = resObj.data.notes;

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
  }, []);

  return (
    <div>
      {!error && !isLoading && allNotes.length !== 0 && (
        <NotesList notes={allNotes} />
      )}{" "}
      {error && !isLoading && allNotes.length === 0 && (
        <h1>No Notes Found!! Check Your Internet Connection😌😌</h1>
      )}
      {!error && isLoading && allNotes.length === 0 && <Loader />}
    </div>
  );
};

export default AllNotes;
