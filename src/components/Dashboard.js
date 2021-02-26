import React, { useContext, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { Container, Row, Col, Badge, Card } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import ItemList from "./ItemList";
import { RiArrowUpSLine } from "react-icons/ri";
import { Helmet } from "react-helmet";
import coffee from "../assets/coffee.png";
import { Storage } from "aws-amplify";
import { ConfigContext } from "../App";
import { useIsMounted } from "../lib/utils";
import { API } from "aws-amplify";
export default Dashboard;

function sortByFrequencyAndRemoveDuplicates(array) {
  let frequency = {};
  let value;

  // compute frequencies of each value
  for (var i = 0; i < array.length; i++) {
    value = array[i];
    if (value in frequency) {
      frequency[value]++;
    } else {
      frequency[value] = 1;
    }
  }

  // make array from the frequency object to de-duplicate
  var uniques = [];
  for (value in frequency) {
    uniques.push(value);
  }

  // sort the uniques array in descending order by frequency
  function compareFrequency(a, b) {
    return frequency[b] - frequency[a];
  }

  return uniques.sort(compareFrequency);
}

function Dashboard({ config, faviconUrl, avatarUrl }) {
  const { galleryImages } = useContext(ConfigContext);

  const [imageUrls, setImageUrls] = useState([]);
  const [fsImageIdx, setFSImageIdx] = useState(null);
  const [tags, setTags] = useState(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const categories = await API.graphql({
        query: `query ListTags {
          listPosts(filter: {tags: {size: {gt: 0}}}) {
            items {
              tags
            }
          }
        }        
      `,
      });
      const preppedTags = categories.data.listPosts.items.reduce(
        (acc, curr) => [...acc, ...curr.tags],
        []
      );
      const sorted = sortByFrequencyAndRemoveDuplicates(preppedTags);
      const topTen = sorted.slice(0, 10);

      setTags(topTen);
    }

    fetchData();
  }, []);

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
      className="pt-3 bg-light"
      style={{ paddingLeft: "100px", paddingRight: "100px" }}
    >
      <Helmet>
        <title>{config.fullName || ""}</title>
        <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
      </Helmet>
      <Row>
        <Col lg={4}>
          <ProfileCard avatarUrl={avatarUrl} config={config} />
          <Card
            className="my-2 cursor-pointer"
            onClick={() => window.open("https://www.buymeacoffee.com/joshmk")}
          >
            <Row className="no-gutters">
              <div className="col-auto p-3">
                <img
                  src={coffee}
                  className="img-fluid"
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
              <Col className="d-flex" style={{ alignItems: "center" }}>
                <div className="card-block px-3">
                  <h4 className="card-title mb-1">Buy Josh a coffee!</h4>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col lg={4}>
          <small className="text-dark">RECENT WRITINGS</small>
          <ItemList mini />
        </Col>
        <Col lg={4} className="hidden-sm">
          <small className="text-dark">RECENT CREATIONS</small>
          <Row className="mt-1">
            {[1, 2, 3].map((num) => (
              <Col
                key={num}
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
                key={num}
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
          {tags && tags.length > 0 ? (
            <>
              <small className="text-dark">POPULAR TAGS</small>
              <div>
                {tags.map((tag) => (
                  <h4 className="d-inline" key={"popular-tag-" + tag}>
                    <Badge
                      variant="lightgray"
                      className="mr-2 cursor-pointer hover"
                      onClick={() => navigate(`/search?tag=${tag}`)}
                    >
                      {tag}
                    </Badge>
                  </h4>
                ))}
              </div>
            </>
          ) : null}
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
