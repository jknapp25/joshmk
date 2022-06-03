import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Amplify, { API } from "aws-amplify";
import "react-vertical-timeline-component/style.min.css";
import "@aws-amplify/ui-react/styles.css";

import ItemList from "./components/ItemList";
import Home from "./components/Home.js";
import Post from "./components/Post.js";
import PostEditor from "./components/PostEditor.js";
import ItemPreview from "./components/ItemPreview.js";
import ItemEditor from "./components/ItemEditor.js";
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
import awsExports from "./aws-exports";
import * as queries from "./graphql/queries";
import useIsMounted from "./lib/useIsMounted";
import FullScreenImageCarousel from "./components/FullScreenImageCarousel";
import "./App.scss";

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
          <Routes primary={false}>
            <Route path="/" element={<Home />}>
              <Route path="*" element={<ItemList />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="post/:id" element={<Post />} />
              <Route path="post/:id/edit" element={<PostEditor />} />
              <Route path="post/create" element={<PostEditor />} />
              <Route path="item/:id" element={<ItemPreview />} />
              <Route path="item/:id/edit" element={<ItemEditor />} />
              <Route path="item/create" element={<ItemEditor />} />
              <Route path="job/:id" element={<Job />} />
              <Route path="job/:id/edit" element={<JobEditor />} />
              <Route path="job/create" element={<JobEditor />} />
              <Route path="project/:id" element={<Project />} />
              <Route path="project/:id/edit" element={<ProjectEditor />} />
              <Route path="project/create" element={<ProjectEditor />} />
              <Route path="education/:id" element={<Education />} />
              <Route path="education/:id/edit" element={<EducationEditor />} />
              <Route path="education/create" element={<EducationEditor />} />
              <Route path="create" element={<Create />} />
              <Route path="settings" element={<Settings />} />
              <Route path="about" element={<Bio bio={config.bio} />} />
            </Route>
          </Routes>
          <FullScreenImageCarousel />
        </div>
      </ImageContext.Provider>
    </ConfigContext.Provider>
  );
}
