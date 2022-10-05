import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "react-bootstrap";

export default Tag;

interface TagProps {
  tag: string;
  size: ButtonProps["size"] | undefined;
}

const defaultProps = {
  size: "md",
};

function Tag({ tag, size }: TagProps & typeof defaultProps) {
  const navigate = useNavigate();

  return (
    <Button
      key={`popular-tag-${tag}`}
      size={size}
      variant="tag"
      className="me-2 mb-2 d-inline rounded-pill text-nowrap border"
      onClick={() => navigate(`/search?tag=${tag}`)}
    >
      {tag}
    </Button>
  );
}
