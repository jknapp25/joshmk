import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "aws-amplify";
import moment from "moment";
import { Badge } from "react-bootstrap";

import ImageCarousel from "./ImageCarousel";
import Tag from "./Tag";
import Category from "./Category";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import useIsMounted from "../lib/useIsMounted";
import * as queries from "../graphql/queries";

export default Post;

function Post({ post = {} }) {
  const [realPost, setRealPost] = useState(post);
  const isMounted = useIsMounted();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const postData = await API.graphql({
        query: queries.getPost,
        variables: { id: params.id },
      });

      if (postData && isMounted.current) {
        setRealPost(postData.data.getPost);
      }
    }
    if (params.id) {
      fetchData();
    }
  }, [params.id, isMounted]);

  if (!realPost) return null;

  let { id, title, richContent, tags, category, images, createdAt } = realPost;

  richContent = richContent ? JSON.parse(richContent) : richContent;

  const isToday = moment(createdAt).isSame(new Date(), "day");

  return (
    <div className="pb-3">
      <div className="mb-4">
        {isToday ? (
          <Badge bg="success" className="me-2">
            New
          </Badge>
        ) : null}
        <Category category={category} />
        <h1 className="mb-1 display-5">
          <span className="cursor-pointer fw-bold">
            <Link to={`/post/${id}`} className="hidden-link">
              {title}
            </Link>
          </span>
        </h1>
      </div>

      <ImageCarousel
        images={images}
        classes="mb-4 rounded bg-secondary bg-opacity-10 shadow-lg"
      />

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
            <Tag key={`tag-${tag}`} tag={tag} size="sm" />
          ))}
        </div>
      )}
    </div>
  );
}
