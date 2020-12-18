import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { Card, Container, Row, Col } from "react-bootstrap";
import SideNav from "./SideNav";
import { Helmet } from "react-helmet";
import { API, Storage } from "aws-amplify";
import * as queries from "../graphql/queries";
import { useIsMounted } from "../lib/utils";
export default Home;

export const ConfigContext = React.createContext({});

function Home({ children }) {
  const [showAsides, setAhowAsides] = useState(true);
  const [config, setConfig] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");

  const isMounted = useIsMounted();

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
      if (configData && isMounted.current)
        setConfig(configData.data.getConfiguration || {});
    }
    if (process.env.REACT_APP_CONFIGURATION_ID) {
      fetchData();
    }
  }, [isMounted]);

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

  return (
    <ConfigContext.Provider value={config}>
      <Container fluid onWheel={handleScroll}>
        <Helmet>
          <title>{config.fullName || ""}</title>
          <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
        </Helmet>
        <Row>
          <Col xs={3}>
            <Card className="mx-3 mt-4">
              <div>
                <Card.Img
                  variant="top"
                  src={avatarUrl}
                  onClick={() => navigate("/")}
                />
              </div>
              <Card.Footer>
                <Card.Title>{config.fullName}</Card.Title>
                <Card.Text>{config.tagline}</Card.Text>
              </Card.Footer>
            </Card>
          </Col>
          <Col xs={6}>{children}</Col>
          <Col xs={3}>
            <SideNav navOptions={config.pages} />
          </Col>
        </Row>
      </Container>
    </ConfigContext.Provider>
  );
}
