import React, { useEffect, useState, useContext } from "react";
import { navigate, useLocation, Link } from "@reach/router";
import { Card, Container, Row, Col } from "react-bootstrap";
import SideNav from "./SideNav";
import { Helmet } from "react-helmet";
import { Storage } from "aws-amplify";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
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

  if (pathname === "/gallery") {
    return (
      <Container fluid>
        <Helmet>
          <title>{config.fullName || ""}</title>
          <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
        </Helmet>
        <Row>
          <Col xs={10}>{children}</Col>
          <Col xs={2}>
            <SideNav navOptions={config.pages} />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Helmet>
        <title>{config.fullName || ""}</title>
        <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
      </Helmet>
      <Row>
        <Col xs={3}>
          <Card className="mx-3 mt-4">
            <Card.Img
              variant="top"
              src={avatarUrl}
              onClick={() => navigate("/")}
            />
            <Card.Body>
              <Card.Title>
                <Link to="bio">{config.fullName}</Link>
              </Card.Title>
              <Card.Text>{config.tagline}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <RiInstagramFill
                className="d-inline cursor-pointer social-icon instagram"
                size="1.3em"
                title="instagram"
                onClick={() => window.open(config.instagramUrl, "_blank")}
              />
              <FaYoutube
                className="ml-2 d-inline cursor-pointer social-icon youtube"
                size="1.3em"
                title="youtube"
                onClick={() => window.open(config.youtubeUrl, "_blank")}
              />
            </Card.Footer>
          </Card>
        </Col>
        <Col xs={6} className="py-4">
          {children}
        </Col>
        <Col xs={3}>
          <SideNav navOptions={config.pages} />
        </Col>
      </Row>
    </Container>
  );
}
