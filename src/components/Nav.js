import React from "react";
import { Link, useLocation, navigate } from "@reach/router";
import { Nav } from "react-bootstrap";
import VisibilitySensor from "react-visibility-sensor";
import { MdShowChart } from "react-icons/md";
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
        <span style={{ fontSize: "1.5em", color: "#e8e8e8" }}> | </span>
        <MdShowChart
          color="#ff00eb"
          size="2.1em"
          className="ml-3 pt-1"
          onClick={() => navigate("skills")}
          style={{ cursor: "pointer" }}
        />
      </Nav>
    </VisibilitySensor>
  );
}
