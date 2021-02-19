import React, { useContext, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { Container, Row, Col, Badge, Card } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import ItemList from "./ItemList";
import NavBar from "./NavBar";
import { RiArrowUpSLine } from "react-icons/ri";
import { Helmet } from "react-helmet";
import image from "./BattleOfFyetnas/assets/warlord1.jpg";
import coffee from "../assets/hot-cup.png";
import { Storage } from "aws-amplify";
import { ConfigContext } from "../App";
import { useIsMounted } from "../lib/utils";
export default Dashboard;

function Dashboard({ config, faviconUrl, avatarUrl, popularTags }) {
  const { galleryImages } = useContext(ConfigContext);

  const [imageUrls, setImageUrls] = useState([]);
  const [fsImageIdx, setFSImageIdx] = useState(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const imagesCalls = galleryImages.map((url) => Storage.get(url));
      const resImageUrls = await Promise.all(imagesCalls);

      if (isMounted.current) setImageUrls(resImageUrls);
    }
    if (galleryImages && galleryImages.length) {
      fetchData();
    } else {
      if (isMounted.current) setImageUrls([]);
    }
  }, [galleryImages, isMounted]);

  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <Container
      fluid
      className="pt-3"
      style={{ paddingLeft: "100px", paddingRight: "100px" }}
    >
      <Helmet>
        <title>{config.fullName || ""}</title>
        <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
      </Helmet>
      <NavBar config={config} />
      <Row>
        <Col lg={4} className="bg-light">
          <ProfileCard avatarUrl={avatarUrl} config={config} />
          <div
            class="card mt-2 mb-2 cursor-pointer"
            onClick={() => window.open("https://www.buymeacoffee.com/joshmk")}
          >
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
                <div class="card-block px-3 py-2">
                  <h5 class="card-title mb-1">Buy Josh a coffee</h5>
                  <p class="card-text">MMMMMM delish!</p>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col lg={4} className="bg-light">
          <small className="text-dark">RECENT WRITINGS</small>
          <ItemList mini />
        </Col>
        <Col lg={4} className="bg-light hidden-sm">
          <small className="text-dark">RECENT CREATIONS</small>
          <Row className="mt-1">
            {[1, 2, 3].map((num) => (
              <Col
                className={`text-center ${num === 1 ? "pr-1" : ""} ${
                  num === 2 ? "px-1" : ""
                } ${num === 3 ? "pl-1" : ""}`}
              >
                <Card.Img
                  variant="top"
                  src={imageUrls[imageUrls.length - num]}
                />
                {/* <small className="text-muted">Drawing</small> */}
              </Col>
            ))}
          </Row>
          <Row className="mt-3">
            {[4, 5, 6].map((num) => (
              <Col
                className={`text-center ${num === 4 ? "pr-1" : ""} ${
                  num === 5 ? "px-1" : ""
                } ${num === 6 ? "pl-1" : ""}`}
              >
                <Card.Img
                  variant="top"
                  src={imageUrls[imageUrls.length - num]}
                />
              </Col>
            ))}
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
