import React, { useState, useEffect } from "react";
import moment from "moment";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "@reach/router";
import ImageCarousel from "./ImageCarousel";
import Tag from "./Tag";
import SideNavNew from "./SideNavNew";
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
  mini = false,
  pages,
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
  const date = createdAt ? moment(createdAt).format("MMMM D, Y") : null;

  richContent = richContent ? JSON.parse(richContent) : richContent;

  return (
    <Container fluid>
      <Row>
        <Col lg={3}>
          <SideNavNew />
        </Col>
        <Col lg={6} className="p-5 vh-100 overflow-scroll">
          <div>
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
            <div className="mb-3">
              {category ? (
                <small className="text-muted text-capitalize">
                  {category} &bull;{" "}
                </small>
              ) : null}
              <small className="text-muted">{date}</small>
            </div>
          </div>

          <ImageCarousel images={images} classes="mb-3" />

          {richContent ? (
            <RichTextEditor
              value={richContent}
              onChange={() => {}}
              readOnly={true}
            />
          ) : null}

          {tags && tags.length > 0 && (
            <div
              style={{
                whiteSpace: "nowrap",
                overflowX: "scroll",
                boxShadow: "",
              }}
              className="border-0 py-0 mt-4"
            >
              {tags.map((tag) => (
                <Tag key={`tag-${tag}`} tag={tag} />
              ))}
            </div>
          )}
        </Col>
        <Col lg={3}></Col>
      </Row>
    </Container>
  );
}
