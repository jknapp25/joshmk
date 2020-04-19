import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Feed from "./Feed";
import Timeline from "./Timeline";
export default Container;

function Container() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/projects">
            <About />
            <Users />
          </Route>
          <Route path="/stories"></Route>
          <Route path="/skills"></Route>
        </Switch>
      </div>
    </Router>
  );
}
