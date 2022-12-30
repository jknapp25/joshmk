import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Col, Offcanvas, Row } from "react-bootstrap";
import {
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaBars, FaChevronDown } from "react-icons/fa";

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
                    key={page.name}
                    variant="ghost"
                    onClick={() => handlePageClick(`/${page.link}`)}
                    textTransform="capitalize"
                    whiteSpace="nowrap"
                  >
                    {page.name}
                  </Button>
                ))}
                {isSignedIn ? (
                  <Menu>
                    <ButtonGroup isAttached>
                      <Button
                        onClick={() => navigate(`/post/create`)}
                        whiteSpace="nowrap"
                      >
                        Write a story
                      </Button>
                      <MenuButton as={IconButton} icon={<FaChevronDown />} />
                    </ButtonGroup>
                    <MenuList>
                      <MenuItem onClick={() => handlePageClick("/create")}>
                        Create
                      </MenuItem>
                      <MenuItem onClick={() => handlePageClick("/settings")}>
                        Settings
                      </MenuItem>
                      <MenuItem onClick={handleSignout}>Sign out</MenuItem>
                    </MenuList>
                  </Menu>
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
