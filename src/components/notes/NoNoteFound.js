import classes from "./NoNotesFound.module.css";

const NoNotesFound = () => {
  return (
    <div className={classes.nonotes}>
      <p>No notes found!</p>
      <a className="btn">Add a Note</a>
    </div>
  );
};

export default NoNotesFound;
