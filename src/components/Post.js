import React, { useState, useEffect } from "react";
import { Link, useParams, useMatch } from "react-router-dom";
import moment from "moment";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import Helmet from "react-helmet";

import ImageCarousel from "./ImageCarousel";
import Tag from "./Tag";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import useIsMounted from "../lib/useIsMounted";

export default Post;

function Post({ post = {}, bottomBorder = false }) {
  const [realPost, setRealPost] = useState(post);
  const isMounted = useIsMounted();
  const params = useParams();

  const isBlog = useMatch("");

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

  let { id, title, richContent, tags, images, createdAt } = realPost;

  richContent = richContent ? JSON.parse(richContent) : richContent;
  const formattedDateTime = moment(createdAt).calendar(null, {
    sameDay: "[Posted Today]",
    lastDay: "[Posted Yesterday]",
    lastWeek: "dddd, MMM D, YYYY",
    sameElse: "dddd, MMM D, YYYY",
  });

  return (
    <div className={`pb-5 ${bottomBorder ? "border-bottom mb-4" : ""}`}>
      <Helmet>{!isBlog && title ? <title>{title}</title> : null}</Helmet>
      <div className="mb-5 mx-auto text-center" style={{ maxWidth: "650px" }}>
        <h1 className="mb-2 display-4 text-center">
          <span className="cursor-pointer fw-bold">
            <Link to={`/post/${id}`} className="hidden-link">
              {title}
            </Link>
          </span>
        </h1>
        <div
          className="text-muted text-center text-uppercase small"
          style={{ fontWeight: 500 }}
        >
          {formattedDateTime}
        </div>
      </div>

      <ImageCarousel
        images={images}
        classes="mb-4 bg-secondary bg-opacity-10"
      />

      {richContent ? (
        <RichTextEditor
          value={richContent}
          onChange={() => {}}
          readOnly={true}
        />
      ) : null}

      {tags?.length > 0 ? (
        <div
          style={{ maxWidth: "650px" }}
          className="border-0 py-0 mt-4 mx-auto"
        >
          {tags.map((tag) => (
            <Tag key={`tag-${tag}`} tag={tag} size="sm" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
