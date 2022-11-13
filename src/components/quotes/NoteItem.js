import classes from "./NoteItem.module.css";
import { Link } from "react-router-dom";

const NoteItem = (props) => {
  const noteDate = new Date(props.date).toLocaleDateString();

  console.log(props);

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.title}</p>
        </blockquote>
        <figcaption>
          {noteDate ? noteDate.slice(0, 10) : "No date mentioned"}
        </figcaption>
      </figure>
      <Link to={`/notes/${props.id}`} className={classes.btns}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default NoteItem;
