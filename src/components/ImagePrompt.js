import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

import RichTextEditor from "./RichTextEditor/RichTextEditor";
import useIsMounted from "../lib/useIsMounted";

export default function ImagePrompt({ postId, bottomSpace }) {
  const [post, setPost] = useState();

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const postData = await API.graphql({
        query: queries.getPost,
        variables: { id: postId },
      });

      if (postData && isMounted.current) {
        setPost(postData.data.getPost);
      }
    }
    if (postId) {
      fetchData();
    }
  }, [postId, isMounted]);

  if (!post) return;

  const richContent = post.richContent ? JSON.parse(post.richContent) : post.richContent;

  return (
    <div className={bottomSpace ? "mb-5" : ""}>
      {richContent ? (
        <RichTextEditor
          value={richContent}
          onChange={() => {}}
          readOnly={true}
        />
      ) : null}
    </div>
  );
}
