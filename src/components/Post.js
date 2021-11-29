import React, { useState, useEffect } from "react";
import moment from "moment";
import { Badge, Card, Row, Col } from "react-bootstrap";
import { Link, navigate } from "@reach/router";
import ImageCarousel from "./ImageCarousel";
import { useIsMounted } from "../lib/utils";
import { GoPencil } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { deletePost } from "../graphql/mutations";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import MiniImage from "./MiniImage";
export default Post;

function Post({
  post = {},
  setEditingItemId,
  setItemType,
  showEdit = false,
  mini = false,
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

  let { id, title, richContent, tags, category, images, createdAt } = realPost;
  const date = createdAt ? moment(createdAt).format("dddd") : null;

  richContent = richContent ? JSON.parse(richContent) : richContent;

  if (mini) {
    return (
      <div className="row no-gutters" onClick={() => navigate(`/post/${id}`)}>
        <div className="col">
          <div className="px-3 py-2">
            {category ? (
              <small className="text-dark text-uppercase">{category}</small>
            ) : null}
            <h5 className="mb-0">{title}</h5>
            <small className="text-muted">
              {moment(createdAt).format("MMM D")}
            </small>
          </div>
        </div>
        <div className="col-auto">
          <MiniImage images={images} />
        </div>
      </div>
    );
  }

  return (
    <Row>
      <Col lg={3} className="text-right pr-0 bg-white">
        <div className="text-muted border-right mt-4 pr-2 hidden-sm">
          <div className="mb-0" style={{ lineHeight: "normal" }}>
            <small>{date || "No date"}</small>
            <br />
            <small>{moment(createdAt).format("MMMM D, Y") || "No date"}</small>
          </div>
        </div>
      </Col>
      <Col lg={6} className="bg-white">
        <Card className="border-0">
          <Card.Body>
            {category ? (
              <small className="text-dark text-uppercase">{category}</small>
            ) : null}
            <Card.Title>
              <h1 className="mb-0">
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
              </h1>
              <small className="hidden-lg text-muted">
                {moment(createdAt).format("MMMM D, Y") || "No date"}
              </small>
            </Card.Title>

            <ImageCarousel images={images} classes="mb-3" />

            {richContent ? (
              <RichTextEditor
                value={richContent}
                onChange={() => {}}
                readOnly={true}
              />
            ) : null}
          </Card.Body>
          {tags && tags.length > 0 && (
            <Card.Footer
              style={{
                whiteSpace: "nowrap",
                overflowX: "scroll",
                boxShadow: "",
              }}
              className="border-0 py-0"
            >
              {tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="lightgray"
                  className="mr-2 cursor-pointer hover"
                  onClick={() => navigate(`/search?tag=${tag}`)}
                >
                  {tag}
                </Badge>
              ))}
            </Card.Footer>
          )}
        </Card>
      </Col>
      <Col lg={3} className="bg-white"></Col>
    </Row>
  );
}
