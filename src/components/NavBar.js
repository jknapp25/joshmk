import React from "react";
import { navigate, useLocation } from "@reach/router";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
export default NavBar;

function NavBar({ config, bgClass = "bg-white" }) {
  const { pathname } = useLocation();

  if (!config.pagesCustom || config.pagesCustom.length === 0) return null;
  return (
    <Container fluid className={`pt-3 ${bgClass} dashboard-container`}>
      <Row>
        <Col className="px-0">
          <Navbar>
            <Nav className="mr-auto">
              <h2 className="mb-0">
                <Nav.Link
                  href="#"
                  active={pathname === "/"}
                  onClick={() => navigate("/")}
                >
                  {config.fullName || ""}
                </Nav.Link>
              </h2>
            </Nav>
            <Nav>
              {config.pagesCustom.map((page, i) => (
                <h4
                  key={page.name}
                  className={`mb-0 ${
                    i !== config.pagesCustom.length - 1 ? "mr-3" : ""
                  }`}
                >
                  <Nav.Link
                    key={page.name}
                    href="#"
                    active={pathname === `/${page.link}`}
                    onClick={() => navigate(`/${page.link}`)}
                  >
                    {page.name}
                  </Nav.Link>
                </h4>
              ))}
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}
