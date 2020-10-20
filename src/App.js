import React, { useState } from "react";
import { Router } from "@reach/router";
import ItemList from "./components/ItemList";
import Skills from "./components/Skills";
import GoalHours from "./components/GoalHours";
import Home from "./components/Home.js";
// import AddItem from "./components/AddItem.js";
import items from "./lib/items.json";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
export default App;

// Amplify.configure(awsconfig);

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App">
      <Router primary={false}>
        <Home
          path="/"
          showSidebar={showSidebar}
          handleTabsVisibilityChange={(isVisible) => setShowSidebar(!isVisible)}
        >
          <ItemList default items={items} />
          <Skills path="skills" />
          <GoalHours path="goal-hours" />
          {/* <AddItem path="add" /> */}
        </Home>
      </Router>
    </div>
  );
}
