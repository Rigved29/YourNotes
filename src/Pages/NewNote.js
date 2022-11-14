import NoteForm from "../components/notes/NoteForm";
import { useHistory } from "react-router-dom";

const NewNotes = (props) => {
  const history = useHistory();

  const postdata = async (d, uId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}addnote`, {
        method: "POST",
        body: JSON.stringify(d),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      console.log(data);

      props.sndUniqueData(data, uId);
      if (data.status === "success") {
        history.push("/allnotes");
      }
    } catch (err) {
      console.log(new Error(err));
    }
  };

  const addNoteHandler = (noteData) => {
    console.log(noteData);
    postdata(noteData, noteData.id);
    console.log("sent");
  };

  return <NoteForm onAddNote={addNoteHandler} />;
};

export default NewNotes;