import React from "react";
import { navigate } from "@reach/router";
import { Row, Col } from "react-bootstrap";
export default NavBar;

function NavBar({ config }) {
  return (
    <Row>
      <Col className="pb-3">
        <div className="d-inline">
          <h2 className="mb-0 d-inline">{config.fullName || ""}</h2>
        </div>
        <div className="float-right d-inline mt-2 text-dark">
          {config.pages.map((page, i) => (
            <h4
              className={`mb-0 d-inline ${
                i !== config.pages.length - 1 ? "mr-4" : ""
              }`}
              onClick={() => navigate(`/${page}`)}
            >
              {page}
            </h4>
          ))}
        </div>
      </Col>
    </Row>
  );
}
