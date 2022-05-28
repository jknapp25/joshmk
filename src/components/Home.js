import React, { useEffect, useState, useContext } from "react";
import { useMatch, Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Storage } from "aws-amplify";

import SideNavNew from "./SideNavNew";
import Dashboard from "./Dashboard";
import MobileNav from "./MobileNav";
import { ConfigContext } from "../App";
import useIsMounted from "../lib/useIsMounted";

export default Home;

function Home({ children }) {
  const config = useContext(ConfigContext);

  const [avatarUrl, setAvatarUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");

  const isHomeRoute = useMatch("/");
  const isGalleryRoute = useMatch("/gallery");
  const isCreateRoute = useMatch("/create");

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

  if (isHomeRoute) {
    return (
      <Dashboard
        config={config}
        faviconUrl={faviconUrl}
        avatarUrl={avatarUrl}
        children={children}
      />
    );
  }

  const mainColWidth = isGalleryRoute || isCreateRoute ? 9 : 6;

  return (
    <Container fluid style={{ maxWidth: "1440px" }}>
      <Helmet>
        <title>{config.fullName || ""}</title>
        <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
      </Helmet>
      <MobileNav fullName={config.fullName} />
      <Row>
        <Col
          lg={3}
          className="p-0 vh-100 d-none d-lg-flex align-items-center sticky"
        >
          <SideNavNew classes="p-5 mb-5" />
        </Col>
        <Col lg={mainColWidth} className="p-4 p-lg-5">
        <Outlet />
          {/* {children} */}
        </Col>
      </Row>
    </Container>
  );
}
