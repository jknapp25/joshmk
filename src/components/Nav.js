import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import {
  Button,
  Col,
  Dropdown,
  Offcanvas,
  Row,
  ButtonGroup,
} from "react-bootstrap";
import { FaBars } from "react-icons/fa";

import SideNavNew from "./SideNavNew";
import Logo from "./Logo";
import { ConfigContext } from "../App";

import "react-vertical-timeline-component/style.min.css";

export default Nav;

function Nav() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { pathname } = useLocation();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

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

    // if (onPageClick) {
    handleClose();
    // }
  }

  if (!config.pagesCustom || config.pagesCustom.length === 0) return null;

  return (
    <>
      <Row className="">
        <Col className="mx-auto border-bottom" style={{ maxWidth: "1920px" }}>
          <Row className="py-3 d-flex justify-content-between mx-auto">
            <Col className="d-flex align-items-center">
              <Logo handlePageClick={handlePageClick} />
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              <span className="cursor-pointer d-lg-none" onClick={handleShow}>
                <FaBars size="2em" title="clear search" className="float-end" />
              </span>
              <div className="d-none d-lg-flex">
                {config.pagesCustom.map((page) => (
                  <Button
                    variant="link"
                    key={page.name}
                    active={pathname === `/${page.link}`}
                    onClick={() => handlePageClick(`/${page.link}`)}
                    className={`p-0 ms-4 text-nowrap text-uppercase text-decoration-none ${
                      pathname === `/${page.link}` ? "text-dark" : "text-muted"
                    }`}
                  >
                    {page.name}
                  </Button>
                ))}
                {isSignedIn ? (
                  <Dropdown as={ButtonGroup} className="ms-4">
                    <Button
                      onClick={() => navigate(`/post/create`)}
                      className="text-nowrap"
                    >
                      WRITE A STORY
                    </Button>
                    <Dropdown.Toggle split id="dropdown-toggle-write-a-story" />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handlePageClick("/create")}>
                        CREATE
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handlePageClick("/settings")}
                      >
                        SETTINGS
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSignout}>
                        SIGN OUT
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : null}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Pages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SideNavNew onPageClick={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
