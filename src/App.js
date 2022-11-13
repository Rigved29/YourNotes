import { Route, Switch, Redirect } from "react-router-dom";
import AllNotes from "./Pages/AllNotes";
import NewNote from "./Pages/NewNote";
import NoteDetail from "./Pages/NoteDetail";
import Layout from "./components/layout/Layout";
import NotFound from "./Pages/NotFound";

function App() {
  const getUniqueData = (d, id) => {
    localStorage.setItem(id, d.name);
  };
  console.log(typeof uniqueId);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/allnotes" />
        </Route>
        <Route path="/allnotes" exact>
          <AllNotes />
        </Route>
        <Route path="/notes/:noteId">
          <NoteDetail />
        </Route>
        <Route path="/new-note">
          <NewNote sndUniqueData={getUniqueData} />
        </Route>
        <Route path="*">
          <NotFound />{" "}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
