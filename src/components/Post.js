import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { navigate, Link } from "@reach/router";
import ImageCarousel from "./ImageCarousel";
import { createTimeInfo, useIsMounted } from "../lib/utils";
import { GoPencil } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { deletePost } from "../graphql/mutations";
export default Post;

function Post({
  post = {},
  setEditingItemId,
  setItemType,
  showEdit = false,
  ...props
}) {
  const [realPost, setRealPost] = useState(post);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const postData = await API.graphql({
        query: queries.getPost,
        variables: { id: props.id },
      });

      if (postData && isMounted.current) {
        setRealPost(postData.data.getPost);
      }
    }
    if (props.id) {
      fetchData();
    }
  }, [props.id, isMounted]);

  async function deletePst() {
    if (realPost.id) {
      await API.graphql(
        graphqlOperation(deletePost, { input: { id: realPost.id } })
      );
    }
  }

  if (!realPost) return null;

  const { id, title, content, tags, images, createdAt } = realPost;
  const timeInfo = createTimeInfo(null, createdAt, null, true);

  return (
    <div className="px-0 border-0">
      <h2 className="mb-1">
        <span className="cursor-pointer">
          <Link to={`/post/${id}`}>{title}</Link>
        </span>{" "}
        {showEdit ? (
          <>
            <span
              onClick={() => {
                setItemType("post");
                setEditingItemId(id);
                window.scrollTo(0, 0);
              }}
            >
              <GoPencil
                style={{
                  display: "inline",
                  cursor: "pointer",
                  color: "#6c757d",
                }}
              />
            </span>
            <span
              onClick={() => {
                const shouldDelete = window.confirm("Delete the item?");
                if (shouldDelete) {
                  deletePst();
                }
              }}
            >
              <FaTrashAlt
                className="ml-2"
                style={{
                  display: "inline",
                  cursor: "pointer",
                  color: "#dc3545",
                }}
              />
            </span>
          </>
        ) : null}
      </h2>
      <div className="mb-3">
        <small className="text-muted">{timeInfo}</small>
      </div>

      <ImageCarousel images={images} classes="mb-3" />

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
