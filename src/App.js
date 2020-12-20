import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import ItemList from "./components/ItemList";
import Skills from "./components/Skills";
import GoalHours from "./components/GoalHours";
import Home from "./components/Home.js";
import Post from "./components/Post.js";
import CreateItem from "./components/CreateItem.js";
import Configure from "./components/Configure.js";
import Bio from "./components/Bio.js";
import Gallery from "./components/Gallery.js";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import * as queries from "./graphql/queries";
import { useIsMounted } from "./lib/utils";
import { API } from "aws-amplify";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
export default App;

Amplify.configure(awsExports);

export const ConfigContext = React.createContext({});

function App() {
  const [config, setConfig] = useState({});
  const configContextValue = { ...config, setConfig };

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const configData = await API.graphql({
        query: queries.getConfiguration,
        variables: { id: process.env.REACT_APP_CONFIGURATION_ID },
      });
      if (configData && isMounted.current)
        setConfig(configData.data.getConfiguration || {});
    }
    if (process.env.REACT_APP_CONFIGURATION_ID) {
      fetchData();
    }
  }, [isMounted]);

  return (
    <ConfigContext.Provider value={configContextValue}>
      <div className="App">
        <Router primary={false}>
          <Home path="/">
            <ItemList default />
            <Gallery path="gallery" />
            <Post path="post/:id" />
            <Skills path="skills" />
            <GoalHours path="goal-hours" />
            <CreateItem path="create" />
            <Configure path="configure" />
            <Bio path="bio" />
          </Home>
        </Router>
      </div>
    </ConfigContext.Provider>
  );
}
