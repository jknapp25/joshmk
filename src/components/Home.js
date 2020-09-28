import React from "react";
import { navigate } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";
import Name from "./Name";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import selfie from "../assets/ProfilePic.jpg";
export default Home;

const navOptions = ["blog", "work", "projects"];

function Home({ children, showSidebar, handleTabsVisibilityChange }) {
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
          <SideNav show={showSidebar} navOptions={navOptions} />
        </Col>
        <Col xs={7}>
          <Name />
          <NavBar
            handleTabsVisibilityChange={handleTabsVisibilityChange}
            navOptions={navOptions}
          />
          {children}
        </Col>
        <Col />
      </Row>
    </Container>
  );
}
