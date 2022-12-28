import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Amplify, API, Storage } from "aws-amplify";

import { ChakraProvider } from "@chakra-ui/react";

import ItemList from "./components/ItemList.js";
import MainView from "./components/MainView.js";
import Post from "./views/Post.js";
import PostEditor from "./views/PostEditor.js";
import Item from "./views/Item.js";
import ItemEditor from "./views/ItemEditor.js";
import Job from "./views/Job.js";
import JobEditor from "./views/JobEditor.js";
import Project from "./views/Project.js";
import ProjectEditor from "./views/ProjectEditor.js";
import Education from "./views/Education.js";
import EducationEditor from "./components/EducationEditor.js";
import Create from "./views/Create.js";
import Settings from "./views/Settings.js";
import Gallery from "./views/Gallery.js";
import awsExports from "./aws-exports";
import * as queries from "./graphql/queries";
import useIsMounted from "./lib/useIsMounted";
import FullScreenImageCarousel from "./components/FullScreenImageCarousel";
import Nav from "./components/Nav";
import Search from "./views/Search";

import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

export default App;

Amplify.configure(awsExports);

export const ConfigContext = React.createContext({});
export const ImageContext = React.createContext({});

function App() {
  const [faviconUrl, setFaviconUrl] = useState("");

  const [config, setConfig] = useState({});
  const [imageContext, setImageContext] = useState({
    isOpen: false,
    index: null,
    imageUrls: [],
  });
  const configContextValue = { ...config, setConfig };
  const imageContextValue = { ...imageContext, setImageContext };

  const isMounted = useIsMounted();
  const configIdName = "REACT_APP_CONFIGURATION_ID";

  useEffect(() => {
    async function fetchData() {
      const configData = await API.graphql({
        query: queries.getConfiguration,
        variables: { id: process.env[configIdName] },
      });
      if (configData && isMounted.current) {
        let newConfig = configData.data.getConfiguration;
        if (newConfig?.bio) {
          newConfig.bio = JSON.parse(newConfig.bio);
        }
        setConfig(newConfig || {});
      }
    }
    if (process.env[configIdName]) {
      fetchData();
    }
  }, [isMounted, configIdName]);

  useEffect(() => {
    async function fetchData() {
      const faviconUrl = await Storage.get(config.favicon);
      if (faviconUrl && isMounted.current) setFaviconUrl(faviconUrl);
    }
    if (config.favicon) {
      fetchData();
    }
  }, [config.favicon, isMounted]);

  return (
    <ConfigContext.Provider value={configContextValue}>
      <ImageContext.Provider value={imageContextValue}>
        <ChakraProvider>
          <div className="App">
            <Container fluid>
              <Helmet>
                <title>{config.fullName || ""}</title>
                <meta
                  name="description"
                  content={config.tagline || `Website for ${config.fullName}`}
                />
                <link
                  rel="icon"
                  type="image/png"
                  href={faviconUrl}
                  sizes="16x16"
                />
              </Helmet>
              <Nav fullName={config.fullName} />
              <Routes primary={false}>
                <Route element={<MainView />}>
                  <Route path="/" element={<ItemList />} />
                  <Route path="work" element={<ItemList />} />
                  <Route path="projects" element={<ItemList />} />
                  <Route path="gallery" element={<Gallery />} />
                  <Route path="post/:id" element={<Post />} />
                  <Route path="post/:id/edit" element={<PostEditor />} />
                  <Route path="post/create" element={<PostEditor />} />
                  <Route path="item/:id" element={<Item />} />
                  <Route path="item/:id/edit" element={<ItemEditor />} />
                  <Route path="item/create" element={<ItemEditor />} />
                  <Route path="job/:id" element={<Job />} />
                  <Route path="job/:id/edit" element={<JobEditor />} />
                  <Route path="job/create" element={<JobEditor />} />
                  <Route path="project/:id" element={<Project />} />
                  <Route path="project/:id/edit" element={<ProjectEditor />} />
                  <Route path="project/create" element={<ProjectEditor />} />
                  <Route path="education/:id" element={<Education />} />
                  <Route
                    path="education/:id/edit"
                    element={<EducationEditor />}
                  />
                  <Route
                    path="education/create"
                    element={<EducationEditor />}
                  />
                  <Route path="create" element={<Create />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="search" element={<Search />} />
                </Route>
              </Routes>
            </Container>
            <FullScreenImageCarousel />
          </div>
        </ChakraProvider>
      </ImageContext.Provider>
    </ConfigContext.Provider>
  );
}
