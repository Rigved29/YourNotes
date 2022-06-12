import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import { quoteContext } from "../context/context";
import { useContext } from "react";

const NewQuotes = (props) => {
  const [ctxQ] = useContext(quoteContext);

  console.log(ctxQ, "dekho");

  const history = useHistory();
  //https://react-router-eb1ed-default-rtdb.firebaseio.com/quotes.json
  const postdata = async (d, uId) => {
    try {
      const response = await fetch("http://localhost:8000/addpost", {
        method: "POST",
        body: JSON.stringify(d),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      console.log(data);

      props.sndUniqueData(data, uId);
    } catch (err) {
      console.log(new Error(err));
    }
  };

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
    postdata(quoteData, quoteData.id);
    console.log("sent");

    history.push("/quotes");
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuotes;
