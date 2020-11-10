import React, {useState,useEffect} from "react";
import {
  Badge,
  Card,
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
    <Card className="px-0 py-4 border-top border-left-0 border-right-0 border-bottom-0">
      {images && images.length > 1 ? (
        <Carousel interval={10000000}>
          {imageUrls.map((url, i) => (
            <Carousel.Item key={i}>
              <Image variant="top" src={url} />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : null}
        <h2 className="mb-1">{title}</h2>
        <div className="mb-3"><small className="text-muted">{timeInfo}</small></div>
        {images && images.length === 1 && imageUrls[0] ? (
          <Image src={imageUrls[0]} fluid />
        ): null}
        <div
          className={`${
            tags && tags.length > 0 ? "mb-2" : ""
          } font-weight-normal mt-2`}
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
    </Card>
  );
}
