import React from "react";
import { navigate } from "@reach/router";
import { Button } from "react-bootstrap";
export default Tag;

function Tag({ tag }) {
  return (
    <Button
      key={"popular-tag-" + tag}
      variant="light"
      size="sm"
      className="me-2 mb-2 d-inline"
      onClick={() => navigate(`/search?tag=${tag}`)}
    >
      {tag}
    </Button>
  );
}
