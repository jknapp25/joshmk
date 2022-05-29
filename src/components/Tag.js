import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default Tag;

function Tag({ tag, size = "md" }) {
  const navigate = useNavigate();

  return (
    <Button
      key={`popular-tag-${tag}`}
      size={size}
      variant="tag"
      className="me-2 mb-2 d-inline rounded-pill text-nowrap"
      onClick={() => navigate(`/search?tag=${tag}`)}
    >
      {tag}
    </Button>
  );
}
