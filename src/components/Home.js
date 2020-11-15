import React from "react";
import { navigate, useLocation } from "@reach/router";
import { parse } from "query-string";
import { Badge, Card, Container, Row, Col } from "react-bootstrap";
import SideNav from "./SideNav";
import selfie from "../assets/selfie2.jpg";
export default Home;

const navOptions = ["blog", "work", "projects", "create"];

function Home({ children }) {
  const { pathname, search } = useLocation();
  const searchParams = parse(search);

  const activeSearch = pathname === "/search";

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card
            className="mx-3 my-4 position-sticky"
            style={{ borderRadius: "15px", top: "20px" }}
          >
            <Card.Img
              variant="top"
              src={selfie}
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
              onClick={() => navigate("/")}
            />
            <Card.Footer>
              <Card.Title>Josh Knapp</Card.Title>
              <Card.Text>
                I create stories, apps, and whatever comes to mind...
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
        <Col xs={6}>{children}</Col>
        <Col>
          <SideNav show={true} navOptions={navOptions} />
        </Col>
      </Row>
    </Container>
  );
}
