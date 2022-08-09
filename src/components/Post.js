import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

import ImageCarousel from "./ImageCarousel";
import Tag from "./Tag";
import Category from "./Category";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import NewBadge from "./NewBadge";
import useIsMounted from "../lib/useIsMounted";

export default Post;

function Post({ post = {}, bottomBorder = false }) {
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

  return (
    <div className={`pb-5 mb-4 ${bottomBorder ? "border-bottom" : ""}`}>
      <div className="mb-4 mx-auto" style={{ maxWidth: "650px" }}>
        <NewBadge createdAt={createdAt} />
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
