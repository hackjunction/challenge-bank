import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home/";
import Challenge from "./components/Challenge";
import Cities from "./components/Cities";

const App = () => (
  <Router>
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cities" component={Cities} />
          <Route path="/challenge/:id" component={Challenge} />
        </Switch>
      </main>
    </div>
  </Router>
);

export default App;
