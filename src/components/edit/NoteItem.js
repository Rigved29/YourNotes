import classes from "./NoteItem.module.css";

const NoteItem = (props) => {
  return (
    <li className={classes.item}>
      <p>{props.text}</p>
    </li>
  );
};

export default NoteItem;
