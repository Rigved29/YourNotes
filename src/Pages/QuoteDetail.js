import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { quoteContext } from "../context/context";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const QuotesDetail = (props) => {
  const [ctxQ] = useContext(quoteContext);
  console.log(props.uId);
  const [q, setQ] = useState({});

  const history = useHistory();

  console.log(ctxQ, "hello bhaiya");
  const quoteArr = Object.values(ctxQ.Quotes);

  console.log(quoteArr);

  const match = useRouteMatch();
  const params = useParams();
  console.log(params.quoteId);

  console.log(match);
  console.log(
    quoteArr,
    params.quoteId,
    `http://localhost:8000/${params.quoteId}/`
  );

  const quote = quoteArr.find((q) => q.id === Number(params.quoteId));
  console.log(quote);

  console.log(localStorage.getItem(params.quoteId));

  const uniqueID = localStorage.getItem(params.quoteId);
  console.log(uniqueID);

  useEffect(() => {
    const getQuote = async () => {
      // console.log(quote, uniqueID);

      const response = await fetch(`http://localhost:8000/${params.quoteId}/`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const dataResponse = await response.json();
      console.log(dataResponse.data.note);
      setQ(dataResponse.data.note);
    };

    getQuote();
  }, [params.quoteId]);

  const deleteNoteHandler = () => {
    const deleteNote = async () => {
      console.log(quote, uniqueID);

      const response = await fetch(`http://localhost:8000/${params.quoteId}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      // const data = await response.json();

      // console.log(data);
      console.log(response);
    };

    history.push("/quotes");

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
          <Link to={`${match.url}/comments`} className="btn--flat">
            Edit Your Note
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments noteBody={q.noteBody} title={q.title} uID={params.quoteId} />
      </Route>

      <button onClick={deleteNoteHandler} className="centered">
        Delete
      </button>
    </div>
  );
};

export default QuotesDetail;
