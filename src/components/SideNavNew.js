import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button } from "react-bootstrap";
import "react-vertical-timeline-component/style.min.css";

import { ConfigContext } from "../App";
import "../App.css";

export default SideNavNew;

function SideNavNew({ classes, onPageClick }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { pathname } = useLocation();

  const config = useContext(ConfigContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function isAuthenticated() {
      const isAuth = await Auth.currentAuthenticatedUser();
      setIsSignedIn(!!isAuth);
    }
    isAuthenticated();
  }, []);

  function handleSignout() {
    Auth.signOut();
    navigate("/");
    setIsSignedIn(false);
  }

  function handlePageClick(page) {
    navigate(page);

    if (onPageClick) {
      onPageClick();
    }
  }

  if (!config.pagesCustom || config.pagesCustom.length === 0) return null;

  return (
    <div className={classes}>
      {config.pagesCustom.map((page) => (
        <Button
          variant="link"
          key={page.name}
          active={pathname === `/${page.link}`}
          onClick={() => handlePageClick(`/${page.link}`)}
          className={`p-0 d-block fs-5 text-capitalize text-decoration-none ${
            pathname === `/${page.link}` ? "text-dark" : "text-muted"
          }`}
        >
          {page.name}
        </Button>
      ))}
      {isSignedIn ? (
        <>
          -
          <Button
            variant="link"
            onClick={() => handlePageClick("/create")}
            active={pathname === "/create"}
            className={`p-0 d-block fs-5 text-capitalize text-decoration-none ${
              pathname === `/create` ? "text-dark" : "text-muted"
            }`}
          >
            Create
          </Button>
          <Button
            variant="link"
            onClick={() => handlePageClick("/settings")}
            active={pathname === "/settings"}
            className={`p-0 d-block fs-5 text-capitalize text-decoration-none ${
              pathname === `/settings` ? "text-dark" : "text-muted"
            }`}
          >
            Settings
          </Button>
          <Button
            variant="link"
            onClick={handleSignout}
            className={`p-0 d-block fs-5 text-capitalize text-decoration-none text-muted`}
          >
            Sign out
          </Button>
        </>
      ) : null}
    </div>
  );
}
