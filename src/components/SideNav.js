import React from "react";
import { Link } from "@reach/router";
import { Nav, Fade } from "react-bootstrap";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
import logo from "../assets/josh_logo_5.png";
export default SideNav;

function SideNav({ show }) {
  return (
    <Fade in={show}>
      <Nav className="sticky mr-3" style={{ top: "65px", display: "block" }}>
        <img
          src={logo}
          width="57"
          height="87"
          alt="Logo"
          className="mb-3 mr-3"
        />
        {["work", "projects", "stories"].map((page, i) => (
          <Nav.Item className="d-block" key={i}>
            <Nav.Link
              className="pl-0"
              as={Link}
              to={`/${page}`}
              eventKey={"/" + page}
            >
              {page}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Fade>
  );
}
