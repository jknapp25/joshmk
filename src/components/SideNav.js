import React from "react";
import { Link, useLocation, navigate } from "@reach/router";
import { Nav, Fade } from "react-bootstrap";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
import logo from "../assets/josh_logo_5.png";
import selfie from "../assets/selfie2.jpg";
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
        <img
          src={selfie}
          width="150"
          height="150"
          alt="Profile_picture"
          className="mr-3 mb-4 box align-top cursor-pointer"
          style={{ borderRadius: '15px' }}
          onClick={() => navigate("/")}
        />
        {/* <img
          src={logo}
          width="57"
          height="87"
          alt="Logo"
          className="mb-3 mr-3"
        /> */}
        {navOptions.map((page, i) => (
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
