import React from "react";
import { navigate, useLocation } from "@reach/router";
import { Row, Col, Container } from "react-bootstrap";
export default NavBar;

function NavBar({ config, bgClass = "bg-white" }) {
  const { pathname } = useLocation();
  return (
    <Container
      fluid
      className={`pt-3 ${bgClass}`}
      style={{ paddingLeft: "100px", paddingRight: "100px" }}
    >
      <Row>
        <Col className="pb-3">
          <div className="d-inline">
            <h2
              className="mb-0 d-inline cursor-pointer"
              onClick={() => navigate("/")}
            >
              {config.fullName || ""}
            </h2>
          </div>
          <div className="float-right d-inline mt-2">
            {config.pages.map((page, i) => (
              <h4
                key={page}
                className={`mb-0 d-inline cursor-pointer ${
                  i !== config.pages.length - 1 ? "mr-4" : ""
                } ${pathname === "/" + page ? "text-danger" : "text-dark"}`}
                onClick={() => navigate(`/${page}`)}
              >
                {page}
              </h4>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
