import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "@reach/router";
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

  if (pathname === "/gallery") {
    return (
      <Container fluid>
        <Row>
          <Col lg={3}>
            <SideNavNew pages={config.pagesCustom} />
          </Col>
          <Col lg={9} className="vh-100 overflow-scroll">
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

  if (pathname === "/about") {
    return <>{children}</>;
  }

  if (pathname === "/work" || pathname === "/projects") {
    return (
      <Row>
        <Col lg={3}>
          <SideNavNew pages={config.pagesCustom} />
        </Col>
        <Col lg={6} className="vh-100 overflow-scroll">
          {children}
        </Col>
        <Col lg={3}></Col>
      </Row>
    );
  }

  return <>{children}</>;
}
