import React, {useState,useEffect} from "react";
import {
  Badge,
  Carousel,
  Image,
} from "react-bootstrap";
import { navigate } from "@reach/router";
import { Storage } from "aws-amplify";
import { createTimeInfo } from "../lib/utils";
export default Post;

function Post({ post }) {
  const { title, content, tags, images, createdAt } = post;
  const timeInfo = createTimeInfo(null, createdAt, null, true);

  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const imageUrls = await Storage.get(images[0]);
      setImageUrls([imageUrls]);
    }
    if (images && images.length) {
      fetchData();
    }
  }, [images]);

  return (
    <div className="mb-5 w-100">
      {images && images.length > 1 ? (
        <Carousel interval={10000000}>
          {imageUrls.map((url, i) => (
            <Carousel.Item key={i}>
              <Image variant="top" src={url} />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : null}
      {images && images.length === 1 && imageUrls[0] ? (
        <Image src={imageUrls[0]} fluid />
      ): null}
        <small className="text-muted">{timeInfo}</small>
        <h5>{title}</h5>
        <div
          className={`${
            tags && tags.length > 0 ? "mb-2" : ""
          } font-weight-normal`}
        >
          {content}
        </div>
        {tags && tags.length > 0 && (
          <div
            style={{
              whiteSpace: "nowrap",
              overflowX: "scroll",
              boxShadow: "",
            }}
          >
            {tags.map((tag, i) => (
              <Badge
                pill
                variant="transparent"
                className="mr-2"
                key={i}
                onClick={() => navigate(`?search=${tag}`)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
    </div>
  );
}
