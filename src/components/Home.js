import React, { useState } from "react";
import { navigate } from "@reach/router";
import { Card, Container, Row, Col, Fade } from "react-bootstrap";
import SideNav from "./SideNav";
import selfie from "../assets/selfie2.jpg";
export default Home;

const navOptions = ["blog", "work", "projects"];

function Home({ children }) {
  const [showAsides, setAhowAsides] = useState(true);

  function handleScroll(e) {
    if (e.nativeEvent.wheelDelta > 0) {
      if (!showAsides) setAhowAsides(true);
    } else {
      if (showAsides) setAhowAsides(false);
    }
  }

  return (
    <Container fluid onWheel={handleScroll}>
      <Row>
        <Col>
          <Fade in={showAsides}>
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
          </Fade>
        </Col>
        <Col xs={6}>{children}</Col>
        <Col>
          {showAsides ? <SideNav show={true} navOptions={navOptions} /> : null}
        </Col>
      </Row>
    </Container>
  );
}
