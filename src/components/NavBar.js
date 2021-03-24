import React, { useState } from "react";
import { navigate, useLocation } from "@reach/router";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { slide as Menu } from "react-burger-menu";
import { FiMenu, FiX } from "react-icons/fi";
export default NavBar;

function NavBar({ config, bgClass = "bg-white" }) {
  const { pathname } = useLocation();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  if (!config.pagesCustom || config.pagesCustom.length === 0) return null;
  return (
    <>
      <Menu
        right
        noOverlay
        disableAutoFocus
        width={280}
        isOpen={sideMenuOpen}
        className="bg-dark text-light"
      >
        <Col>
          <Row className="mt-3">
            <Col>
              <FiX
                size="2em"
                className="cursor-pointer float-right mr-2"
                onClick={() => setSideMenuOpen(false)}
              />
            </Col>
          </Row>
          {config.pagesCustom.map((page, i) => (
            <Row
              onClick={() => {
                setSideMenuOpen(false);
                navigate(`/${page.link}`);
              }}
            >
              <Col>
                <h5 className="cursor-pointer">{page.name}</h5>
              </Col>
            </Row>
          ))}
        </Col>
      </Menu>
      <Container fluid className={`pt-0 ${bgClass} dashboard-container`}>
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
              <Nav className="hidden-mlg">
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
              <Nav className="hidden-above-mlg">
                <h2 className="mb-0">
                  <Nav.Link
                    href="#"
                    onClick={() => setSideMenuOpen(true)}
                    className="pt-0"
                  >
                    <FiMenu className="cursor-pointer" />
                  </Nav.Link>
                </h2>
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </>
  );
}
