import React from "react";
import { Link, useLocation } from "@reach/router";
import { Nav } from "react-bootstrap";
import VisibilitySensor from "react-visibility-sensor";
export default NavBar;

function NavBar({ handleTabsVisibilityChange }) {
  const { pathname } = useLocation();
  return (
    <VisibilitySensor
      onChange={handleTabsVisibilityChange}
      partialVisibility={true}
    >
      <Nav
        id="controlled-tab-example"
        activeKey={pathname}
        className="border-0 mb-4"
      >
        {["work", "projects", "stories"].map(page => (
          <Nav.Item>
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
