import React, { useState } from "react";
import { Router } from "@reach/router";
import ItemList from "./components/ItemList";
import Skills from "./components/Skills";
import GoalHours from "./components/GoalHours";
import Home from "./components/Home.js";
import Post from "./components/Post.js";
import CreateItem from "./components/CreateItem.js";
import Configure from "./components/Configure.js";
import Bio from "./components/Bio.js";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
export default App;

Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <Router primary={false}>
        <Home path="/">
          <ItemList default />
          <Post path="post/:id" />
          <Skills path="skills" />
          <GoalHours path="goal-hours" />
          <CreateItem path="create" />
          <Configure path="configure" />
          <Bio path="bio" />
        </Home>
      </Router>
    </div>
  );
}
