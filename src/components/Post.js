import React, { useState, useEffect } from "react";
import { Badge, Card, Carousel, Image } from "react-bootstrap";
import { navigate } from "@reach/router";
import { Storage } from "aws-amplify";
import { createTimeInfo } from "../lib/utils";
import { GoPencil } from "react-icons/go";
export default Post;

function Post({ post, setEditingItemId, showEdit = false }) {
  const { id, title, content, tags, images, createdAt } = post;
  const timeInfo = createTimeInfo(null, createdAt, null, true);

  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const imagesCalls = images.map((url) => {
        return Storage.get(url);
      });

      const imageUrls = await Promise.all(imagesCalls);

      setImageUrls(imageUrls);
    }
    if (images && images.length) {
      fetchData();
    }
  }, [images]);

  return (
    <Card className="px-0 py-4 border-top border-left-0 border-right-0 border-bottom-0">
      <h2 className="mb-1">
        {title}{" "}
        {showEdit ? (
          <span onClick={() => setEditingItemId(id)}>
            <GoPencil
              color="secondary"
              style={{ display: "inline", cursor: "pointer", color: "#6c757d" }}
            />
          </span>
        ) : null}
      </h2>
      <div className="mb-3">
        <small className="text-muted">{timeInfo}</small>
      </div>
      {images && images.length > 1 ? (
        <Carousel className="mb-3" interval={10000000}>
          {imageUrls.map((url, i) => (
            <Carousel.Item key={i}>
              <img className="w-100" src={url} alt={url} />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : null}
      {images && images.length === 1 && imageUrls[0] ? (
        <Image className="mb-3" src={imageUrls[0]} fluid />
      ) : null}
      <div
        className={`${
          tags && tags.length > 0 ? "mb-3" : ""
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
              key={i}
              pill
              variant="transparent"
              className="mr-2"
              onClick={() => navigate(`/search?tag=${tag}`)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}
