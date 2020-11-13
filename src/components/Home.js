import React from "react";
import { navigate, useLocation } from "@reach/router";
import { parse } from "query-string";
import { Badge, Container, Row, Col } from "react-bootstrap";
import Name from "./Name";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import selfie from "../assets/selfie2.jpg";
export default Home;

const navOptions = ["blog", "work", "projects", "add"];

function Home({ children, showSidebar, handleTabsVisibilityChange }) {
  const { search } = useLocation();
  const searchParams = parse(search);

  const activeSearch = searchParams.search || null;

  return (
    <Container>
      <Row>
        <Col className="text-right">
          {/* {!showSidebar || activeSearch ? ( */}
          {/* <img
            src={selfie}
            width="100"
            height="100"
            alt="Profile_picture"
            className="mt-5 box align-top rounded-circle cursor-pointer"
            onClick={() => navigate("/")}
          /> */}
          {/* ) : null} */}
          {/* {!activeSearch ? ( */}
          <SideNav show={true} navOptions={navOptions} />
          {/* ) : null} */}
        </Col>
        <Col xs={7}>
          {/* <Name /> */}
          {activeSearch ? (
            <div className="mb-4">
              Viewing items tagged:
              <Badge pill variant="transparent" className="ml-2 active">
                {activeSearch}
              </Badge>
              <span
                className="text-muted ml-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                clear
              </span>
            </div>
          ) : null}
          {children}
        </Col>
        <Col />
      </Row>
    </Container>
  );
}
