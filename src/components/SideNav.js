import React from "react";
import { Link, useLocation } from "@reach/router";
import { Nav } from "react-bootstrap";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
export default SideNav;

function SideNav({ navOptions }) {
  const { pathname } = useLocation();
  if (!navOptions || navOptions.length === 0) return null;
  const activeKey = pathname === "/" ? `/${navOptions[0]}` : pathname;
  return (
    <Nav activeKey={activeKey} className="position-fixed mr-3 mt-5 d-block">
      {navOptions.map((page, i) => (
        <Nav.Item
          className={`d-block ${activeKey === "/" + page ? "border-left" : ""}`}
          key={i}
        >
          <Nav.Link as={Link} to={`/${page}`} eventKey={"/" + page}>
            {page}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
