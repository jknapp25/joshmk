import React, { useState } from "react";
import { navigate } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";
import SideNav from "./SideNav";
import selfie from "../assets/ProfilePic.jpg";
export default Home;

function Home({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Container>
      <Row>
        <Col className="text-right">
          {!showSidebar && (
            <img
              src={selfie}
              width="100"
              height="100"
              alt="Profile_picture"
              style={{ border: "3px solid black", cursor: "pointer" }}
              className="mt-5 box align-top rounded-circle"
              onClick={() => navigate("/")}
            />
          )}
          <SideNav show={showSidebar} />
        </Col>
        <Col xs={7}>{children}</Col>
        <Col />
      </Row>
    </Container>
  );
}
