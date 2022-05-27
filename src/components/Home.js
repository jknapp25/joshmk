import React, { useEffect, useState, useContext } from "react";
import { useMatch } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";
import SideNavNew from "./SideNavNew";
import Dashboard from "./Dashboard";
import { Helmet } from "react-helmet";
import { Storage } from "aws-amplify";
import { useIsMounted } from "../lib/utils";
import { ConfigContext } from "../App";
import MobileNav from "./MobileNav";
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
      <MobileNav 
        fullName={config.fullName}
      />
      <Row>
        <Col
          lg={3}
          className="p-0 vh-100 d-none d-lg-flex align-items-center sticky"
        >
          <div className="p-5">
            <SideNavNew classes="mb-5" />
          </div>
        </Col>
        <Col lg={mainColWidth} className="p-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
