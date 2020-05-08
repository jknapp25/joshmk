import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import VisibilitySensor from "react-visibility-sensor";
export default NavBar;

function NavBar({ handleTabsVisibilityChange }) {
  const { pathname } = useLocation();
  const activeKey = pathname === "/" ? "/work" : pathname;
  return (
    <VisibilitySensor
      onChange={handleTabsVisibilityChange}
      partialVisibility={true}
    >
      <Nav
        id="controlled-tab-example"
        activeKey={activeKey}
        className="border-0 mb-4"
      >
        {["work", "projects", "stories"].map((page, i) => (
          <Nav.Item key={i}>
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
    </VisibilitySensor>
  );
}
