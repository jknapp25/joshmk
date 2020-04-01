import React from "react";
import { Nav, Fade } from "react-bootstrap";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
import logo from "../assets/josh_logo_5.png";
export default SideNav;

function SideNav({ show, activePage, setActivePage }) {
  return (
    <Fade in={show}>
      <Nav
        activeKey={activePage}
        onSelect={setActivePage}
        className="sticky mr-3"
        style={{ top: "65px", display: "block" }}
      >
        <img
          src={logo}
          width="57"
          height="87"
          alt="Logo"
          className="mb-3 mr-3"
        />
        <Nav.Item className="d-block">
          <Nav.Link eventKey="work">work</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-block">
          <Nav.Link eventKey="projects">projects</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-block">
          <Nav.Link eventKey="stories">stories</Nav.Link>
        </Nav.Item>
      </Nav>
    </Fade>
  );
}
