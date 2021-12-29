import React, { useContext, useEffect, useState } from "react";
import { useLocation, navigate } from "@reach/router";
import { Auth } from "aws-amplify";
import { Button } from "react-bootstrap";
import { ConfigContext } from "../App";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
export default SideNavNew;

function SideNavNew() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { pathname } = useLocation();

  const config = useContext(ConfigContext);

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

  if (!config.pagesCustom || config.pagesCustom.length === 0) return null;

  return (
    <div className="p-5">
      {config.pagesCustom.map((page) => (
        <Button
          variant="link"
          key={page.name}
          active={pathname === `/${page.link}`}
          onClick={() => navigate(`/${page.link}`)}
          className={`p-0 d-block fs-5 text-capitalize text-decoration-none ${
            pathname === `/${page.link}` ? "text-dark" : "text-muted"
          }`}
        >
          {page.name}
        </Button>
      ))}
      {isSignedIn ? (
        <>
          <Button
            variant="link"
            onClick={() => navigate("/create")}
            active={pathname === "/create"}
            className={`p-0 d-block fs-5 text-capitalize text-decoration-none ${
              pathname === `/create` ? "text-dark" : "text-muted"
            }`}
          >
            Create
          </Button>
          <Button
            variant="link"
            onClick={() => navigate("/settings")}
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
