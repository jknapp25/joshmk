import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

import ImageCarousel from "./ImageCarousel";
import Tag from "./Tag";
import useIsMounted from "../lib/useIsMounted";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

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
  const date = createdAt ? moment(createdAt).format("MMMM D, Y") : null;

  richContent = richContent ? JSON.parse(richContent) : richContent;

  return (
    <>
      <div>
        <h1 className="mb-0">
          <span className="cursor-pointer">
            <Link to={`/post/${id}`} className="hidden-link">
              {title}
            </Link>
          </span>
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
    </>
  );
}
