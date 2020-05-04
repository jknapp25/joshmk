import React from "react";
import ApolloClient from "apollo-boost";
import { Router } from "@reach/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { ApolloProvider } from "@apollo/react-hooks";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import GoalHours from "./components/GoalHours";
import Stories from "./components/Stories";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home.js";
import initialItems from "./lib/items.json";
export default App;

const statusOrder = ["Active", "On Hold", "Complete"];

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    const token = "a75ea4595d78659587692d3f5bdc0d72706e0811";
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

const GET_REPOS_DATES = gql`
  {
    viewer {
      repositories(last: 10) {
        edges {
          node {
            createdAt
            name
            updatedAt
          }
        }
      }
    }
  }
`;

function App() {
  // const { loading, data } = useQuery(GET_REPOS_DATES);

  // if (loading) return null;
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

  // function handleTabsVisibilityChange(isVisible) {
  //   setShowSidebar(!isVisible);
  // }
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router primary={false}>
          <Home path="/">
            <Work
              default
              work={work}
              path="/work"
              handleTabsVisibilityChange={() => {}}
            />
            <Projects
              handleTabsVisibilityChange={() => {}}
              projects={projects}
              path="projects"
            />
            <Stories
              stories={stories}
              path="stories"
              handleTabsVisibilityChange={() => {}}
            />
            <Skills path="skills" />
            <GoalHours path="goal-hours" />
          </Home>
        </Router>
      </div>
    </ApolloProvider>
  );
}
