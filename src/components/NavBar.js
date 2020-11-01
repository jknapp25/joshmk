import React from "react";
import { Link, useLocation, navigate } from "@reach/router";
import { Nav } from "react-bootstrap";
import VisibilitySensor from "react-visibility-sensor";
import { FiBarChart2 } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
export default NavBar;

function NavBar({ handleTabsVisibilityChange, navOptions }) {
  const { pathname } = useLocation();
  const activeKey = pathname === "/" ? "/blog" : pathname;
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
        {navOptions.map((page, i) => (
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
        <FiBarChart2
          color="#ff00eb"
          size="1.9em"
          className="ml-2 pt-2"
          onClick={() => navigate("skills")}
          style={{ cursor: "pointer" }}
          title="Skills Overview"
        />
        <AiOutlinePlusCircle
          color="green"
          size="1.9em"
          className="ml-2 pt-2"
          onClick={() => navigate("add")}
          style={{ cursor: "pointer" }}
          title="Add item"
        />
      </Nav>
    </VisibilitySensor>
  );
}
