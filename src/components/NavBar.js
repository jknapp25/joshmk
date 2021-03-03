import React from "react";
import { navigate, useLocation } from "@reach/router";
import { Row, Col, Container } from "react-bootstrap";
export default NavBar;

function NavBar({ config, bgClass = "bg-white" }) {
  const { pathname } = useLocation();
  if (!config.pagesCustom || config.pagesCustom.length === 0) return null;
  return (
    <Container fluid className={`pt-3 ${bgClass} dashboard-container`}>
      <Row>
        <Col className="pb-3">
          <div className="d-inline">
            <h2
              className={`mb-0 d-inline cursor-pointer nav-item-hover ${
                pathname === "/" ? "text-danger" : ""
              }`}
              onClick={() => navigate("/")}
            >
              {config.fullName || ""}
            </h2>
          </div>
          <div className="float-right d-inline mt-2">
            {config.pagesCustom.map((page, i) => (
              <h4
                key={page.name}
                className={`mb-0 d-inline cursor-pointer ${
                  i !== config.pagesCustom.length - 1 ? "mr-4" : ""
                } ${
                  pathname === "/" + page.name ? "text-danger" : "text-dark"
                }`}
                onClick={() => navigate(`/${page.link}`)}
              >
                <span className="nav-item-hover">{page.name}</span>
              </h4>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
