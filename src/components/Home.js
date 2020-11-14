import React from "react";
import { navigate, useLocation } from "@reach/router";
import { parse } from "query-string";
import { Badge, Card, Container, Row, Col } from "react-bootstrap";
import SideNav from "./SideNav";
import selfie from "../assets/selfie2.jpg";
export default Home;

const navOptions = ["blog", "work", "projects", "create"];

function Home({ children }) {
  const { search } = useLocation();
  const searchParams = parse(search);

  const activeSearch = searchParams.search || null;

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
        <Col xs={6}>
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
        <Col>
          <SideNav show={true} navOptions={navOptions} />
        </Col>
      </Row>
    </Container>
  );
}
