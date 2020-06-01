import React, { useState } from "react";
import { Router } from "@reach/router";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import GoalHours from "./components/GoalHours";
import Stories from "./components/Stories";
import Home from "./components/Home.js";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import initialItems from "./lib/items.json";
export default App;

const statusOrder = ["Active", "On Hold", "Complete"];

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const data = null;

  const itemsEnrichedWithGithubData = initialItems.map(itm => {
    if (itm.hasRepo && data) {
      const { node } = data.viewer.repositories.edges.find(
        ({ node }) => node.name === itm.title
      );

      return {
        ...itm,
        start: node.createdAt,
        lastUpdated: node.updatedAt
      };
    } else {
      return itm;
    }
  });

  const projects = itemsEnrichedWithGithubData
    .filter(itm => itm.type === "projects")
    .sort(
      (a, b) =>
        statusOrder.indexOf(a.badgeText) - statusOrder.indexOf(b.badgeText)
    );
  const stories = itemsEnrichedWithGithubData.filter(
    itm => itm.type === "stories"
  );
  const work = itemsEnrichedWithGithubData.filter(itm => itm.type === "work");

  function handleTabsVisibilityChange(isVisible) {
    setShowSidebar(!isVisible);
  }

  return (
    <div className="App">
      <Router primary={false}>
        <Home path="/" showSidebar={showSidebar}>
          <Work
            default
            work={work}
            handleTabsVisibilityChange={handleTabsVisibilityChange}
            path="work"
          />
          <Projects
            handleTabsVisibilityChange={handleTabsVisibilityChange}
            projects={projects}
            path="projects"
          />
          <Stories
            stories={stories}
            handleTabsVisibilityChange={handleTabsVisibilityChange}
            path="stories"
          />
          <Skills path="skills" />
          <GoalHours path="goal-hours" />
        </Home>
      </Router>
    </div>
  );
}
