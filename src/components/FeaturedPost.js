import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { navigate } from "@reach/router";
import { Card } from "react-bootstrap";

import useIsMounted from "../lib/useIsMounted";

export default FeaturedPost;

function FeaturedPost(post) {
  const [imageUrls, setImageUrls] = useState([]);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const imagesCalls = images.map((url) => Storage.get(url));
      const resImageUrls = await Promise.all(imagesCalls);

      if (isMounted.current) setImageUrls(resImageUrls);
    }
    if (images && images.length) {
      fetchData();
    } else {
      if (isMounted.current) setImageUrls([]);
    }
  }, [images, isMounted]);

  if (images.length === 0) return null;

  return (
    <Card className="hidden-xs">
      <Card.Img
        variant="top"
        src={imageUrls[0]}
        onClick={() => navigate("/")}
      />

      <Card.Body>
        {category ? (
          <small className="text-dark text-uppercase">{category}</small>
        ) : null}
        <h5 className="card-title mb-0">{title}</h5>
        <small className="text-muted">
          {moment(createdAt).format("MMM D")}
        </small>
      </Card.Body>
    </Card>
  );
}
