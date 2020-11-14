import React, { useState } from "react";
import { Router } from "@reach/router";
import ItemList from "./components/ItemList";
import Skills from "./components/Skills";
import GoalHours from "./components/GoalHours";
import Home from "./components/Home.js";
import CreateItem from "./components/CreateItem.js";
import items from "./lib/items.json";
import Amplify from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
export default withAuthenticator(App);

Amplify.configure({
  aws_project_region: "us-west-2",
  aws_appsync_graphqlEndpoint:
    "https://7gp2g5vrvnempduyilcqm7gcxm.appsync-api.us-west-2.amazonaws.com/graphql",
  aws_appsync_region: "us-west-2",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-adm65wjtf5halghqn7b4xmlroa",
  Auth: {
    identityPoolId: "us-west-2:9579e2e0-16ba-43c4-a613-9a9fd99fc3f2",
    region: "us-west-2",
    userPoolId: "us-west-2_T0B7qRcPP",
    userPoolWebClientId: "4qfe9ji8aqs296bi3ekaqp57ua",
    mandatorySignIn: false,
  },
  Storage: {
    AWSS3: {
      bucket: "joshmk-bucket",
      region: "us-west-2",
    },
  },
});

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
          <CreateItem path="create" />
        </Home>
      </Router>
      {/* <AmplifySignOut /> */}
    </div>
  );
}
