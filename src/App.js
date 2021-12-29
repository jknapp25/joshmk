import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import ItemList from "./components/ItemList";
import GoalHours from "./components/GoalHours";
import Home from "./components/Home.js";
import Post from "./components/Post.js";
import PostEditor from "./components/PostEditor.js";
import Job from "./components/Job.js";
import JobEditor from "./components/JobEditor.js";
import Project from "./components/Project.js";
import ProjectEditor from "./components/ProjectEditor.js";
import Education from "./components/Education.js";
import EducationEditor from "./components/EducationEditor.js";
import Create from "./components/Create.js";
import Settings from "./components/Settings.js";
import Bio from "./components/Bio.js";
import Gallery from "./components/Gallery.js";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import * as queries from "./graphql/queries";
import { useIsMounted } from "./lib/utils";
import { API } from "aws-amplify";
import FullScreenImageCarousel from "./components/FullScreenImageCarousel";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
export default App;

Amplify.configure(awsExports);

export const ConfigContext = React.createContext({});
export const ImageContext = React.createContext({});

function App() {
  const [config, setConfig] = useState({});
  const [imageContext, setImageContext] = useState({
    isOpen: false,
    index: null,
    imageUrls: [],
  });
  const configContextValue = { ...config, setConfig };
  const imageContextValue = { ...imageContext, setImageContext };

  const isMounted = useIsMounted();
  const configIdName = window.location.href.includes("joshmk")
    ? "REACT_APP_JOSHMK_CONFIGURATION_ID"
    : "REACT_APP_CONFIGURATION_ID";

  useEffect(() => {
    async function fetchData() {
      const configData = await API.graphql({
        query: queries.getConfiguration,
        variables: { id: process.env[configIdName] },
      });
      if (configData && isMounted.current)
        setConfig(configData.data.getConfiguration || {});
    }
    if (process.env[configIdName]) {
      fetchData();
    }
  }, [isMounted, configIdName]);

  return (
    <ConfigContext.Provider value={configContextValue}>
      <ImageContext.Provider value={imageContextValue}>
        <div className="App">
          <Router primary={false}>
            <Home path="/">
              <ItemList default />
              <Gallery path="gallery" />
              <Post path="post/:id" />
              <PostEditor path="post/:id/edit" />
              <PostEditor path="post/create" />
              <Job path="job/:id" />
              <JobEditor path="job/:id/edit" />
              <JobEditor path="job/create" />
              <Project path="project/:id" />
              <ProjectEditor path="project/:id/edit" />
              <ProjectEditor path="project/create" />
              <Education path="education/:id" />
              <EducationEditor path="education/:id/edit" />
              <EducationEditor path="education/create" />
              <GoalHours path="goal-hours" />
              <Create path="create" />
              <Settings path="settings" />
              <Bio path="about" bio={config.bio} />
            </Home>
          </Router>
          <FullScreenImageCarousel />
        </div>
      </ImageContext.Provider>
    </ConfigContext.Provider>
  );
}
