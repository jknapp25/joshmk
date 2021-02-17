import React, { useEffect, useState, useContext } from "react";
import { navigate, useLocation } from "@reach/router";
import {
  Button,
  Container,
  Row,
  Col,
  Badge,
  Card,
  CardDeck,
  CardColumns,
} from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import { RiArrowUpSLine } from "react-icons/ri";
import { Helmet } from "react-helmet";
import { Storage } from "aws-amplify";
import goatFavicon from "../assets/goat-favicon.png";
import { useIsMounted } from "../lib/utils";
import { ConfigContext } from "../App";
import image from "./BattleOfFyetnas/assets/warlord1.jpg";
import coffee from "../assets/hot-cup.png";
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

  const popularTags = window.location.href.includes("joshmk")
    ? ["poetry", "drawing", "creature", "Exogenesis", "God", "book notes"]
    : ["painting", "art studio", "art", "writing"];

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

  if (pathname === "/battle-of-fyetnas") return children;

  if (pathname === "/test") {
    return (
      <Container fluid className="px-5 pt-3">
        <Helmet>
          <title>{config.fullName || ""}</title>
          <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
        </Helmet>
        <Row>
          <Col className="pb-3">
            <div className="d-inline">
              <h2 className="mb-0 d-inline">Joshua Knapp</h2>
            </div>
            <div className="float-right d-inline mt-2 text-dark">
              <h4 className="mb-0 d-inline mr-4">Blog</h4>
              <h4 className="mb-0 d-inline mr-4">Projects</h4>
              <h4 className="mb-0 d-inline mr-4">Work</h4>
              <h4 className="mb-0 d-inline">About</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3} className="bg-light">
            <ProfileCard avatarUrl={avatarUrl} config={config} />
            <div class="card mt-2 mb-2">
              <div class="row no-gutters">
                <div class="col-auto p-3">
                  <img
                    src={coffee}
                    class="img-fluid"
                    alt=""
                    style={{ width: "60px", height: "60px" }}
                  />
                </div>
                <div class="col">
                  <div class="card-block px-3 py-2 align-middle">
                    <h5 class="card-title mb-1">Buy Josh a coffee</h5>
                    <p class="card-text">MMMMMM delish!</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5} className="bg-light">
            <small className="text-dark">RECENT WRITINGS</small>
            {[1, 2, 3, 4, 5].map(() => (
              <div class="card mt-1 mb-2">
                <div class="row no-gutters">
                  <div class="col-auto">
                    <img
                      src="//placehold.it/200"
                      class="img-fluid"
                      alt=""
                      style={{ width: "110px", height: "110px" }}
                    />
                  </div>
                  <div class="col">
                    <div class="card-block px-3 py-2">
                      <h5 class="card-title mb-1">Title</h5>
                      <p class="card-text">
                        This is a monkey and you are a chicken that is very
                        cool, let's hang yo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Col>
          <Col lg={4} className="bg-light hidden-sm">
            <small className="text-dark">RECENT CREATIONS</small>
            <Row className="mt-1">
              <Col className="text-center pr-1">
                <Card.Img variant="top" src={image} />
                <small className="text-muted">Drawing</small>
              </Col>
              <Col className="text-center pr-1 pl-1">
                <Card.Img variant="top" src={image} />
                <small className="text-muted">Drawing</small>
              </Col>
              <Col className="text-center pl-1">
                <Card.Img variant="top" src={image} />
                <small className="text-muted">Drawing</small>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="text-center pr-1">
                <Card.Img variant="top" src={image} />
                <small className="text-muted">Drawing</small>
              </Col>
              <Col className="text-center pr-1 pl-1">
                <Card.Img variant="top" src={image} />
                <small className="text-muted">Drawing</small>
              </Col>
              <Col className="text-center pl-1">
                <Card.Img variant="top" src={image} />
                <small className="text-muted">Drawing</small>
              </Col>
            </Row>
            <div className="my-3" />
            <small className="text-dark">POPULAR CATEGORIES</small>
            <p>
              {popularTags.map((tag) => (
                <h4 className="d-inline">
                  <Badge
                    key={"popular-tag-" + tag}
                    variant="lightgray"
                    className="mr-2 cursor-pointer hover"
                    onClick={() => navigate(`/search?tag=${tag}`)}
                  >
                    {tag}
                  </Badge>
                </h4>
              ))}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="py-2 text-center">
            <div className="d-block">Start reading</div>
            <div>
              <RiArrowUpSLine
                size="2em"
                className="d-block"
                style={{ transform: "scaleY(-1)", margin: "0 auto" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  if (pathname === "/gallery") {
    return (
      <Container fluid>
        <Helmet>
          <title>{config.fullName || ""}</title>
          <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
        </Helmet>
        <Row>
          <Col xs={12} sm={10} md={10} lg={11} className="p-4 bg-light">
            <div className="hidden-md mb-3">
              <NavButtons pages={config.pages} />
            </div>
            {children}
          </Col>
          <Col sm={2} md={2} lg={1} className="pt-4 hidden-xs bg-light">
            <NavButtons pages={config.pages} classes="float-right" />
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
        <Col sm={5} md={4} lg={3} className="pt-4 bg-light">
          <div className="hidden-md">
            <NavButtons pages={config.pages} />
          </div>
          <ProfileCard avatarUrl={avatarUrl} config={config} />
          <div className="pt-4 hidden-lg hidden-xs">
            <NavButtons pages={config.pages} />
            <div className="my-3 hidden-xs" />
            <small className="text-muted hidden-xs">Popular tags</small>
            <p className="hidden-xs">
              {popularTags.map((tag) => (
                <Badge
                  key={pathname + tag}
                  variant="lightgray"
                  className="mr-2 cursor-pointer"
                  onClick={() => navigate(`/search?tag=${tag}`)}
                >
                  {tag}
                </Badge>
              ))}
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
              {popularTags.map((tag) => (
                <Badge
                  key={"popular-tag-" + tag}
                  variant="lightgray"
                  className="mr-2 cursor-pointer hover"
                  onClick={() => navigate(`/search?tag=${tag}`)}
                >
                  {tag}
                </Badge>
              ))}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function NavButtons({ pages, classes = "" }) {
  const { pathname } = useLocation();
  const activePage = pathname === "/" ? `/${pages[0]}` : pathname;
  return pages.map((page) => (
    <Button
      key={pathname + page}
      variant={`/${page}` === activePage ? "danger" : "light"}
      size="md"
      className={`d-inline mr-2 mb-2 ${classes}`}
      style={{ borderRadius: "0px" }}
      onClick={() => navigate(`/${page}`)}
    >
      {page}
    </Button>
  ));
}
