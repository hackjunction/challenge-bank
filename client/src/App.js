import React, { Suspense, useEffect } from "react";
import "./App.css";

import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import ChallengesPage from "./pages/Challenges";
import ChallengePage from "./pages/Challenge";
import HomePage from "./pages/Home";
import EventAdminPage from "./pages/EventAdmin";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import RequiresLogin from "./hocs/RequiresLogin";
import RequiresAdmin from "./hocs/RequiresAdmin";

import * as ContentActions from "redux/content/actions";

const App = ({ history, updateContent }) => {
  useEffect(() => {
    updateContent();
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/challenges">
            <Header />
            <Route
              path="/challenges"
              exact
              component={RequiresLogin(ChallengesPage)}
            />
            <Route
              path="/challenges/:id"
              exact
              component={RequiresLogin(ChallengePage)}
            />
          </Route>
          <Route
            path="/admin"
            exact
            component={RequiresAdmin(EventAdminPage)}
          />
          <Redirect to="/" />
        </Switch>
      </Suspense>
      <ScrollToTop />
    </ConnectedRouter>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateContent: () => dispatch(ContentActions.updateContent())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
