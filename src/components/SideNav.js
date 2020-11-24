import React from "react";
import { Link, useLocation } from "@reach/router";
import { Nav, Fade } from "react-bootstrap";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
export default SideNav;

function SideNav({ show, navOptions }) {
  const { pathname } = useLocation();
  if (!navOptions || navOptions.length === 0) return null;
  const activeKey = pathname === "/" ? `/${navOptions[0]}` : pathname;
  return (
    <Fade in={show}>
      <Nav
        activeKey={activeKey}
        className="sticky mr-3 d-block"
        style={{ top: "65px" }}
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
