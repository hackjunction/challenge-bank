import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/';
import Challenges from './components/Challenges/';
import Challenge from './components/Challenge/';
import Lander from './components/Lander/';

const App = () => (
  <Router>
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Lander} />
          <Route exact path="/challenges" component={Challenges} />
          <Route path="/challenge/:id" component={Challenge} />
        </Switch>
      </main>
    </div>
  </Router>
);

export default App;
