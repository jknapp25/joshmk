import React from "react";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import SideNavNew from "./SideNavNew";
import { Row, Col, Container } from "react-bootstrap";
export default Bio;

function Bio({ bio }) {
  if (!bio) return null;
  bio = JSON.parse(bio);
  return (
    <Container fluid>
      <Row>
        <Col lg={3}>
          <SideNavNew />
        </Col>
        <Col className="vh-100 overflow-scroll p-5">
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
        </Col>
        <Col lg={3}></Col>
      </Row>
    </Container>
  );
}
