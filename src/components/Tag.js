import React from "react";
import { navigate } from "@reach/router";
import { Button } from "react-bootstrap";

export default Tag;

function Tag({ tag }) {
  return (
    <Button
      key={`popular-tag-${tag}`}
      variant="outline-primary"
      size="sm"
      className="me-2 mb-2 d-inline rounded-pill text-nowrap"
      onClick={() => navigate(`/search?tag=${tag}`)}
    >
      {tag}
    </Button>
  );
}
