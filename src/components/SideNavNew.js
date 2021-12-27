import React, { useContext } from "react";
import { useLocation, navigate } from "@reach/router";
import { Button } from "react-bootstrap";
import { ConfigContext } from "../App";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
export default SideNavNew;

function SideNavNew() {
  const { pathname } = useLocation();

  const config = useContext(ConfigContext);

  if (!config.pagesCustom || config.pagesCustom.length === 0) return null;

  return (
    <div className="p-5">
      {config.pagesCustom.map((page) => (
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
