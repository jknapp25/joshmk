import React from "react";
import RichTextEditor from "./RichTextEditor";
import { Card } from "react-bootstrap";
export default Bio;

function Bio({ bio }) {
  if (!bio) return null;
  bio = JSON.parse(bio);
  return (
    <Card>
      <Card.Body>
        <RichTextEditor value={bio} onChange={() => {}} readOnly={true} />
      </Card.Body>
    </Card>
  );
}
