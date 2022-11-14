import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import EditNote from "../components/edit/Note";
import HighlightedQuote from "../components/notes/HighlightedNote";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const NotesDetail = (props) => {
  const [q, setN] = useState({});

  const history = useHistory();

  const match = useRouteMatch();
  const params = useParams();

  const uniqueID = localStorage.getItem(params.noteId);

  useEffect(() => {
    const getNote = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${params.noteId}/`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const dataResponse = await response.json();

      setN(dataResponse.data.note);
    };

    getNote();
  }, [params.noteId]);

  const deleteNoteHandler = () => {
    const deleteNote = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${params.noteId}/`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 204) {
        history.push("/allnotes");
      }
    };

    deleteNote();
  };

  if (!q) {
    return <h2>No quote Found</h2>;
  }

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
