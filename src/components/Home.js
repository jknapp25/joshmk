import React, { useEffect, useState, useContext } from "react";
import { useLocation, useMatch } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";
import SideNavNew from "./SideNavNew";
import Dashboard from "./Dashboard";
import { Storage } from "aws-amplify";
import { useIsMounted } from "../lib/utils";
import { ConfigContext } from "../App";
export default Home;

function Home({ children }) {
  const config = useContext(ConfigContext);
  const { pathname } = useLocation();

  const [avatarUrl, setAvatarUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");

  const isPostRoute = useMatch("/post/*");
  const isJobRoute = useMatch("/job/*");
  const isEducationRoute = useMatch("/education/*");
  const isProjectRoute = useMatch("/project/*");
  const isProjectsRoute = useMatch("/projects");
  const isAboutRoute = useMatch("/about");
  const isWorkRoute = useMatch("/work");
  const isGalleryRoute = useMatch("/gallery");
  const isCreateRoute = useMatch("/create");
  const isSettingsRoute = useMatch("/settings");
  const isSearchRoute = useMatch("/search");

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const avatarUrl = await Storage.get(config.avatar);
      if (avatarUrl && isMounted.current) setAvatarUrl(avatarUrl);
    }
    if (config.avatar) {
      fetchData();
    }
  }, [config.avatar, isMounted]);

  useEffect(() => {
    async function fetchData() {
      const faviconUrl = await Storage.get(config.favicon);
      if (faviconUrl && isMounted.current) setFaviconUrl(faviconUrl);
    }
    if (config.favicon) {
      fetchData();
    }
  }, [config.favicon, isMounted]);

  if (!config.pages || config.pages.length === 0) return null;

  if (isGalleryRoute || isCreateRoute) {
    return (
      <Container fluid>
        <Row>
          <Col lg={3}>
            <SideNavNew />
          </Col>
          <Col lg={9} className="vh-100 overflow-scroll p-5 border-start">
            {children}
          </Col>
        </Row>
      </Container>
    );
  }

  if (pathname === "/") {
    return (
      <Dashboard
        config={config}
        faviconUrl={faviconUrl}
        avatarUrl={avatarUrl}
        children={children}
      />
    );
  }

  if (
    isPostRoute ||
    isJobRoute ||
    isEducationRoute ||
    isProjectRoute ||
    isProjectsRoute ||
    isAboutRoute ||
    isSettingsRoute ||
    isWorkRoute ||
    isSearchRoute
  ) {
    return (
      <Container fluid>
        <Row>
          <Col lg={3}>
            <SideNavNew />
          </Col>
          <Col
            lg={6}
            className="vh-100 overflow-scroll p-5 border-start border-end"
          >
            {children}
          </Col>
          <Col lg={3}></Col>
        </Row>
      </Container>
    );
  }

  return <>{children}</>;
}
