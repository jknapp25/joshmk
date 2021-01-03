import React, { useEffect, useState, useContext } from "react";
import { navigate, useLocation, Link } from "@reach/router";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
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

  const hasSocialLinks = !!config.instagramUrl || !!config.youtubeUrl;

  if (!config.pages || config.pages.length === 0) return null;

  return (
    <Container fluid>
      <Helmet>
        <title>{config.fullName || ""}</title>
        <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
      </Helmet>
      {pathname === "/gallery" ? (
        <Row>
          <Col xs={11} className="p-4">
            {children}
          </Col>
          <Col xs={1} className="pt-4">
            {/* <SideNav navOptions={config.pages} /> */}
            <NavButtons pages={config.pages} />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col sm={5} md={4} lg={3} className="pt-4 bg-light">
            <div className="hidden-md">
              <NavButtons pages={config.pages} />
              <div className="my-3 hidden-xs" />
              <small className="text-muted hidden-xs">Popular tags</small>
              <p className="hidden-xs">
                Coming soon
                {/* <a>love</a>, <a>hope</a>, <a>soul desires</a>, <a>sex</a>,{" "}
              <a>fiction</a>, <a>stories</a>, <a>creativity</a>,{" "}
              <a>paintings</a> */}
              </p>
            </div>
            <Card className="hidden-xs">
              <Card.Img
                variant="top"
                src={avatarUrl}
                onClick={() => navigate("/")}
              />
              <Card.Body>
                <Card.Title>
                  <Link to="about" className="hidden-link">
                    {config.fullName}
                  </Link>
                </Card.Title>
                <Card.Text>{config.tagline}</Card.Text>
              </Card.Body>
              {hasSocialLinks ? (
                <Card.Footer>
                  {!!config.instagramUrl ? (
                    <RiInstagramFill
                      className="d-inline cursor-pointer social-icon instagram"
                      size="1.3em"
                      title="instagram"
                      onClick={() => window.open(config.instagramUrl, "_blank")}
                    />
                  ) : null}
                  {!!config.youtubeUrl ? (
                    <FaYoutube
                      className="ml-2 d-inline cursor-pointer social-icon youtube"
                      size="1.3em"
                      title="youtube"
                      onClick={() => window.open(config.youtubeUrl, "_blank")}
                    />
                  ) : null}
                </Card.Footer>
              ) : null}
            </Card>
            <div className="pt-4 hidden-lg hidden-xs">
              <NavButtons pages={config.pages} />
              <div className="my-3 hidden-xs" />
              <small className="text-muted hidden-xs">Popular tags</small>
              <p className="hidden-xs">
                Coming soon
                {/* <a>love</a>, <a>hope</a>, <a>soul desires</a>, <a>sex</a>,{" "}
              <a>fiction</a>, <a>stories</a>, <a>creativity</a>,{" "}
              <a>paintings</a> */}
              </p>
            </div>
          </Col>
          <Col sm={7} md={8} lg={6} className="py-4 bg-light float">
            {children}
          </Col>
          <Col md={4} lg={3} className="py-4 bg-light hidden-sm">
            <div className="position-fixed">
              <NavButtons pages={config.pages} />
              <div className="my-3" />
              <small className="text-muted">Popular tags</small>
              <p>
                Coming soon
                {/* <a>love</a>, <a>hope</a>, <a>soul desires</a>, <a>sex</a>,{" "}
              <a>fiction</a>, <a>stories</a>, <a>creativity</a>,{" "}
              <a>paintings</a> */}
              </p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

function NavButtons({ pages }) {
  const { pathname } = useLocation();
  const activePage = pathname === "/" ? `/${pages[0]}` : pathname;
  return pages.map((page) => (
    <Button
      variant={`/${page}` === activePage ? "danger" : "light"}
      size="md"
      className="d-inline mr-2 mb-2"
      style={{ borderRadius: "0px" }}
      onClick={() => navigate(`/${page}`)}
    >
      {page}
    </Button>
  ));
}
