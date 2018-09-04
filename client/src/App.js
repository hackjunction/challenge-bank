import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header/";
import Challenges from "./components/Challenges/";
import Challenge from "./components/Challenge/";
import Lander from "./components/Lander/";
import AdminEventsList from "./components/admin/EventsList/";
import AdminCreateEvent from "./components/admin/CreateEvent/";
import AdminEditEvent from "./components/admin/EditEvent";
import AdminSubmissionsList from "./components/admin/SubmissionsList/";
import NotFound from "./components/NotFound/";

const App = () => (
  <Router>
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Lander} />
          <Route exact path="/challenges" component={Challenges} />
          <Route path="/challenge/:id" component={Challenge} />
          <Route exact path="/admin/events" component={AdminEventsList} />
          <Route
            exact
            path="/admin/events/create"
            component={AdminCreateEvent}
          />
          <Route
            exact
            path="/admin/events/edit/:id"
            component={AdminEditEvent}
          />
          <Route
            exact
            path="/admin/submissions"
            component={AdminSubmissionsList}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    </div>
  </Router>
);

export default App;
