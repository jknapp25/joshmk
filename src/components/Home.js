import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import { Helmet } from "react-helmet";
import { Storage } from "aws-amplify";
import goatFavicon from "../assets/goat-favicon.png";
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

  if (pathname === "/rwg") {
    return (
      <Container fluid className="px-0">
        <Helmet>
          <title>Ride With Goats</title>
          <link rel="icon" type="image/png" href={goatFavicon} sizes="16x16" />
        </Helmet>
        {children}
      </Container>
    );
  }

  if (pathname === "/gallery") {
    return (
      <>
        <NavBar config={config} bgClass="bg-white" />
        <Container fluid>
          <Helmet>
            <title>{config.fullName || ""}</title>
            <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
          </Helmet>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className="p-4">
              {children}
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (pathname === "/") {
    return (
      <>
        <NavBar config={config} bgClass="bg-light" />
        <Dashboard
          config={config}
          faviconUrl={faviconUrl}
          avatarUrl={avatarUrl}
          children={children}
        />
        <div className="my-5 hidden-below-lg" />
        {children}
      </>
    );
  }

  if (pathname === "/blog" || pathname === "/about") {
    return (
      <>
        <NavBar config={config} />
        {children}
      </>
    );
  }

  if (pathname === "/work" || pathname === "/projects") {
    return (
      <>
        <NavBar config={config} bgClass="bg-light" />
        <Row className="bg-light">
          <Col lg={3}></Col>
          <Col lg={6}>{children}</Col>
          <Col lg={3}></Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <NavBar config={config} />
      {children}
    </>
  );
}
