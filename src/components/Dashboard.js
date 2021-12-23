import React, { useContext, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import ItemList from "./ItemList";
import Tag from "./Tag";
import SideNavNew from "./SideNavNew";
import { Helmet } from "react-helmet";
import { Storage } from "aws-amplify";
import { ConfigContext } from "../App";
import { useIsMounted } from "../lib/utils";
import { API } from "aws-amplify";
import FullScreenImageCarousel from "./FullScreenImageCarousel";
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
      const topTags = sorted.slice(0, 12);

      setTags(topTags);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let imgs = galleryImages;
      if (galleryImages.length >= 6) {
        imgs = galleryImages.slice(galleryImages.length - 6);
      }
      const imagesCalls = imgs.map((url) => Storage.get(url));
      const resImageUrls = await Promise.all(imagesCalls);

      if (isMounted.current) setImageUrls(resImageUrls);
    }
    if (galleryImages && galleryImages.length) {
      fetchData();
    } else {
      if (isMounted.current) setImageUrls([]);
    }
  }, [galleryImages, isMounted]);

  // if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <Container fluid className="dashboard-container hidden-xs">
      <Helmet>
        <title>{config.fullName || ""}</title>
        <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
      </Helmet>
      <Row>
        <Col lg={3} className="hidden-sm p-0">
          <div className="border-bottom bg-light">
            <div className="p-5">
              <Image
                className="w-100"
                src={avatarUrl}
                fluid
                onClick={() => navigate("/")}
              />
              <br />
              <br />
              <h2 className="mb-0" onClick={() => navigate("/")}>
                {config.fullName || ""}
              </h2>
              <br />
              {config.tagline}
            </div>
          </div>
          <div className="p-5">
            <SideNavNew pages={config.pagesCustom} />
          </div>
        </Col>
        <Col
          lg={6}
          className="hidden-sm p-5 border-start border-end vh-100 overflow-scroll"
        >
          <small className="text-dark">LATEST WRITINGS</small>
          <div className="border-bottom"></div>
          <ItemList mini />
        </Col>
        <Col lg={3} className="hidden-sm p-5">
          {tags && tags.length > 0 ? (
            <>
              <small className="text-dark mb-3">POPULAR TAGS</small>
              <div>
                {tags.map((tag) => (
                  <Tag key={`tag-${tag}`} tag={tag} />
                ))}
              </div>
            </>
          ) : null}

          <div className="my-3" />

          <small className="text-dark mb-3">LATEST CREATIONS</small>
          <ImageGallery images={imageUrls} />
        </Col>
      </Row>
    </Container>
  );
}

const ImageGallery = ({ images }) => {
  const [fsImageIdx, setFSImageIdx] = useState(null);

  return (
    <>
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
              src={images[images.length - num]}
              className="cursor-pointer"
              style={{ cursor: "zoom-in" }}
              onClick={() => setFSImageIdx(images.length - num)}
            />
          </Col>
        ))}
      </Row>
      <Row className="mt-2">
        {[4, 5, 6].map((num) => (
          <Col
            key={num}
            className={`text-center ${num === 4 ? "pr-1" : ""} ${
              num === 5 ? "px-1" : ""
            } ${num === 6 ? "pl-1" : ""}`}
          >
            <Card.Img
              variant="top"
              src={images[images.length - num]}
              className="cursor-pointer"
              style={{ cursor: "zoom-in" }}
              onClick={() => setFSImageIdx(images.length - num)}
            />
          </Col>
        ))}
      </Row>
      <FullScreenImageCarousel
        initialImageIdx={fsImageIdx}
        imageUrls={images}
        onClose={() => setFSImageIdx(null)}
      />
    </>
  );
};
