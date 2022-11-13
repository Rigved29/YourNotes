import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import EditNote from "../components/edit/Note";
import HighlightedQuote from "../components/quotes/HighlightedNote";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const NotesDetail = (props) => {
  console.log(props.uId);
  const [q, setN] = useState({});

  const history = useHistory();

  const match = useRouteMatch();
  const params = useParams();
  console.log(params.noteId);

  console.log(match);
  console.log(params.noteId, `http://localhost:8000/${params.noteId}/`);

  // const note = noteArr.find((q) => q.id === Number(params.noteId));
  // console.log(note);

  console.log(localStorage.getItem(params.noteId));

  const uniqueID = localStorage.getItem(params.noteId);
  console.log(uniqueID);

  useEffect(() => {
    const getNote = async () => {
      // console.log(quote, uniqueID);

      const response = await fetch(`http://localhost:8000/${params.noteId}/`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const dataResponse = await response.json();
      console.log(dataResponse.data.note);
      setN(dataResponse.data.note);
    };

    getNote();
  }, [params.noteId]);

  const deleteNoteHandler = () => {
    const deleteNote = async () => {
      console.log(uniqueID);

      const response = await fetch(`http://localhost:8000/${params.noteId}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      // const data = await response.json();

      // console.log(data);
      console.log(response);

      if (response.status === 204) {
        history.push("/allnotes");
      }
    };

    deleteNote();
  };

  if (!q) {
    return <h2>No quote Found</h2>;
  }

  console.log(q);

  return (
    <div>
      <HighlightedQuote noteBody={q.noteBody} title={q.title} />
      <Route path={match.path} exact>
        <div className="left">
          <Link to={`${match.url}/edit`} className="btn--flat">
            Edit Your Note
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/edit`}>
        <EditNote noteBody={q.noteBody} title={q.title} uID={params.noteId} />
      </Route>

      <button onClick={deleteNoteHandler} className="centered">
        Delete
      </button>
    </div>
  );
};

export default NotesDetail;
