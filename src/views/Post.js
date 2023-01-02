import { useState, useEffect } from "react";
import {
  Link as RouterLink,
  useParams,
  useMatch,
  useNavigate,
} from "react-router-dom";
import moment from "moment";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import Helmet from "react-helmet";

import ImageCarousel from "../components/ImageCarousel";
import { Button, Heading, Link, Text, VStack } from "@chakra-ui/react";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import useIsMounted from "../lib/useIsMounted";

export default Post;

function Post({ post = {}, bottomBorder = false }) {
  const [realPost, setRealPost] = useState(post);

  const navigate = useNavigate();
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
    <VStack
      className={`pb-5 ${bottomBorder ? "border-bottom mb-4" : ""}`}
      spacing={10}
    >
      <Helmet>{!isBlog && title ? <title>{title}</title> : null}</Helmet>
      <VStack align="center" style={{ maxWidth: "650px" }} spacing={3}>
        <Link as={RouterLink} to={`/post/${id}`}>
          <Heading size="3xl" align="center">
            {title}
          </Heading>
        </Link>
        <Text color="gray.500" fontWeight="medium" fontSize="md">
          {formattedDateTime}
        </Text>
      </VStack>

      <ImageCarousel images={images} classes="bg-secondary bg-opacity-10" />

      {richContent ? (
        <RichTextEditor
          value={richContent}
          onChange={() => {}}
          readOnly={true}
        />
      ) : null}

      {tags?.length > 0 ? (
        <div style={{ maxWidth: "650px" }} className="border-0 py-0 mx-auto">
          {tags.map((tag) => (
            <Button
              key={`tag-${tag}`}
              size="xs"
              me={2}
              onClick={() => navigate(`/search?tag=${tag}`)}
            >
              {tag}
            </Button>
          ))}
        </div>
      ) : null}
    </VStack>
  );
}
