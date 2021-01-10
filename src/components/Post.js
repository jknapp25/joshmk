import React, { useState, useEffect } from "react";
import moment from "moment";
import { Badge, Card } from "react-bootstrap";
import { Link, navigate } from "@reach/router";
import ImageCarousel from "./ImageCarousel";
import { useIsMounted } from "../lib/utils";
import { GoPencil } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { deletePost } from "../graphql/mutations";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
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

  let { id, title, richContent, tags, images, createdAt } = realPost;
  const date = createdAt ? moment(createdAt).format("dddd, MMMM D, Y") : null;

  richContent = richContent ? JSON.parse(richContent) : richContent;

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>
              <span className="cursor-pointer">
                <Link to={`/post/${id}`} className="hidden-link">
                  {title}
                </Link>
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
          </Card.Title>
          <Card.Subtitle className="text-muted">
            {date || "No date"}
          </Card.Subtitle>
        </Card.Body>

        <ImageCarousel images={images} classes="mb-3" />

        <Card.Body className="pt-0">
          {richContent ? (
            <RichTextEditor
              value={richContent}
              onChange={() => {}}
              readOnly={true}
            />
          ) : null}
        </Card.Body>
      </Card>
      {tags && tags.length > 0 && (
        <div
          style={{
            whiteSpace: "nowrap",
            overflowX: "scroll",
            boxShadow: "",
          }}
          className="mt-1"
        >
          {tags.map((tag) => (
            <Badge
              variant="lightgray"
              className="mr-2 cursor-pointer hover"
              onClick={() => navigate(`/search?tag=${tag}`)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </>
  );
}
