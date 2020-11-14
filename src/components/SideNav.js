import React from "react";
import { Link, useLocation } from "@reach/router";
import { Nav, Fade } from "react-bootstrap";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
export default SideNav;

function SideNav({ show, navOptions }) {
  const { pathname } = useLocation();
  const activeKey = pathname === "/" ? "/blog" : pathname;
  return (
    <Fade in={show}>
      <Nav
        activeKey={activeKey}
        className="sticky mr-3"
        style={{ top: "65px", display: "block" }}
      >
        {navOptions.map((page, i) => (
          <Nav.Item
            className={`d-block ${
              activeKey === "/" + page ? "border-left" : ""
            }`}
            key={i}
          >
            <Nav.Link as={Link} to={`/${page}`} eventKey={"/" + page}>
              {page}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Fade>
  );
}
