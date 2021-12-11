import React, { useState, useEffect } from "react";
import moment from "moment";
import { navigate } from "@reach/router";
import { useIsMounted } from "../lib/utils";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import MiniImage from "./MiniImage";
export default PostPreview;

function PostPreview({ post = {}, ...props }) {
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

  if (!realPost) return null;

  let { id, title, category, images, createdAt } = realPost;
  const date = createdAt ? moment(createdAt).format("MMM D") : null;

  return (
    <div
      className="row gx-0 cursor-pointer py-3 border-bottom"
      onClick={() => navigate(`/post/${id}`)}
    >
      <div className="col my-auto">
        <div>
          {category ? (
            <small className="text-muted text-uppercase">{category}</small>
          ) : null}
          <h4 className="mb-0 fw-bold">{title}</h4>
          <small className="text-muted">{date}</small>
        </div>
      </div>
      <div className="col-auto">
        <div className="py-2">
          <MiniImage images={images} />
        </div>
      </div>
    </div>
  );
}
