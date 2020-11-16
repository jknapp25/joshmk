import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { Card, Container, Row, Col, Fade } from "react-bootstrap";
import SideNav from "./SideNav";
import selfie from "../assets/selfie2.jpg";
export default Home;

const navOptions = ["blog", "work", "projects", "create"];

function Home({ children }) {
  const [scrollY, setScrollY] = useState(0);
  const [dir, setDir] = useState("up");

  useEffect(() => {
    window.addEventListener("scroll", (e) => handleNavigation(e), false);
    return () => {
      window.removeEventListener("scroll", (e) => handleNavigation(e), false);
    };
  }, [scrollY]);

  function handleNavigation(e) {
    const window = e.currentTarget;

    if (scrollY > window.scrollY) {
      setDir("up");
    } else if (scrollY < window.scrollY) {
      setDir("down");
    }
    setScrollY(window.scrollY);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Fade in={dir === "up"}>
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
          {dir === "up" ? (
            <SideNav show={true} navOptions={navOptions} />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
