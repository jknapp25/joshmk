import React from "react";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import SideNavNew from "./SideNavNew";
import { Card, Row, Col } from "react-bootstrap";
export default Bio;

function Bio({ bio, pages }) {
  if (!bio) return null;
  bio = JSON.parse(bio);
  return (
    <Row>
      <Col lg={3} className="vh-100 overflow-scroll">
        <SideNavNew pages={pages} />
      </Col>
      <Col>
        <Card className="border-0">
          <Card.Body>
            <RichTextEditor
              value={bio}
              onChange={() => {}}
              readOnly={true}
              buttons={[
                "bold",
                "italic",
                "underline",
                "code",
                "strikethrough",
                "heading-one",
                "heading-two",
                "block-quote",
                "numbered-list",
                "bulleted-list",
                "link",
                "video",
              ]}
            />
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3}></Col>
    </Row>
  );
}
