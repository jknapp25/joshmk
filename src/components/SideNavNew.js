import React from "react";
import { useLocation, navigate } from "@reach/router";
import { Button } from "react-bootstrap";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
export default SideNavNew;

function SideNavNew({ pages }) {
  const { pathname } = useLocation();

  if (!pages || pages.length === 0) return null;

  return (
    <div className="p-5">
      {pages.map((page) => (
        <Button
          variant="link"
          key={page.name}
          active={pathname === `/${page.link}`}
          onClick={() => navigate(`/${page.link}`)}
          className={`p-0 d-block fs-4 text-capitalize text-decoration-none ${
            pathname === `/${page.link}` ? "text-dark" : "text-muted"
          }`}
        >
          {page.name}
        </Button>
      ))}
    </div>
  );
}
