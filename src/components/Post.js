import React, { useState, useEffect, useRef } from "react";
import { Badge, Carousel, Image } from "react-bootstrap";
import { navigate } from "@reach/router";
import { Storage } from "aws-amplify";
import { createTimeInfo } from "../lib/utils";
import { GoPencil } from "react-icons/go";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
export default Post;

function Post({
  post = {},
  setEditingItemId,
  setItemType,
  showEdit = false,
  ...props
}) {
  const [realPost, setRealPost] = useState(post);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const postData = await API.graphql({
        query: queries.getPost,
        variables: { id: props.id },
      });

      if (postData) {
        setRealPost(postData.data.getPost);
      }
    }
    if (props.id) {
      fetchData();
    }
  }, [props.id]);

  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const imagesCalls = realPost.images.map((url) => {
        return Storage.get(url);
      });

      const imageUrls = await Promise.all(imagesCalls);

      if (isMounted.current) setImageUrls(imageUrls);
    }
    if (realPost.images && realPost.images.length) {
      fetchData();
    }
  }, [realPost.images]);

  if (!realPost) return null;

  const { id, title, content, tags, images, createdAt } = realPost;
  const timeInfo = createTimeInfo(null, createdAt, null, true);

  return (
    <div className="px-0 py-4 border-top border-left-0 border-right-0 border-bottom-0">
      <h2 className="mb-1">
        <span className="cursor-pointer" onClick={() => navigate(`post/${id}`)}>
          {title}
        </span>{" "}
        {showEdit ? (
          <span
            onClick={() => {
              setItemType("post");
              setEditingItemId(id);
              window.scrollTo(0, 0);
            }}
          >
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
        <Image className="mb-3 w-100" src={imageUrls[0]} fluid />
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
    </div>
  );
}
