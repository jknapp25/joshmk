import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { Card, Container, Row, Col, Fade } from "react-bootstrap";
import SideNav from "./SideNav";
import { Helmet } from "react-helmet";
import { API, Storage } from "aws-amplify";
import * as queries from "../graphql/queries";
export default Home;

function Home({ children }) {
  const [showAsides, setAhowAsides] = useState(true);
  const [config, setConfig] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");

  function handleScroll(e) {
    if (e.nativeEvent.wheelDelta > 0) {
      if (!showAsides) setAhowAsides(true);
    } else {
      if (showAsides) setAhowAsides(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const configData = await API.graphql({
        query: queries.getConfiguration,
        variables: { id: process.env.REACT_APP_CONFIGURATION_ID },
      });
      setConfig(configData.data.getConfiguration || {});
    }
    if (process.env.REACT_APP_CONFIGURATION_ID) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const avatarUrl = await Storage.get(config.avatar);
      setAvatarUrl(avatarUrl);
    }
    if (config.avatar) {
      fetchData();
    }
  }, [config.avatar]);

  useEffect(() => {
    async function fetchData() {
      const faviconUrl = await Storage.get(config.favicon);
      setFaviconUrl(faviconUrl);
    }
    if (config.favicon) {
      fetchData();
    }
  }, [config.favicon]);

  // if (Object.keys(config).length === 0) return null;

  return (
    <Container fluid onWheel={handleScroll}>
      <Helmet>
        <title>{config.name || ""}</title>
        <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
      </Helmet>
      <Row>
        <Col>
          <Fade in={showAsides}>
            <Card
              className="mx-3 my-4 position-sticky"
              style={{
                borderRadius: "15px",
                top: "20px",
                // backgroundColor: "red",
              }}
            >
              <div
                // id="thingy"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                <Card.Img
                  variant="top"
                  src={avatarUrl}
                  style={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    // opacity: 0.75,
                  }}
                  onClick={() => navigate("/")}
                />
              </div>
              <Card.Footer>
                <Card.Title>{config.name}</Card.Title>
                <Card.Text>{config.tagline}</Card.Text>
              </Card.Footer>
            </Card>
          </Fade>
        </Col>
        <Col xs={6}>{children}</Col>
        <Col>
          {showAsides ? (
            <SideNav show={true} navOptions={config.pages} />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
