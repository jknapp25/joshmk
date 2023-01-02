import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Col, Offcanvas, Row } from "react-bootstrap";
import {
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";
import {
  FaBars,
  FaChevronDown,
  FaCog,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

import SideNavNew from "./SideNavNew";
import Logo from "./Logo";
import { ConfigContext } from "../App";

import "react-vertical-timeline-component/style.min.css";

export default Nav;

function Nav() {
  const [isSignedIn, setIsSignedIn] = useState(false);
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
      <Row>
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
                        New post
                      </Button>
                      <MenuButton as={IconButton} icon={<FaChevronDown />} />
                    </ButtonGroup>
                    <MenuList minW="fit-content">
                      <MenuGroup title="Create shit">
                        <MenuItem
                          icon={<FaPlus size=".9em" />}
                          onClick={() => handlePageClick(`/post/create`)}
                          px={4}
                        >
                          New post
                        </MenuItem>
                        <MenuItem
                          icon={<FaPlus size=".9em" />}
                          onClick={() => handlePageClick(`/event/create`)}
                          px={4}
                        >
                          New event
                        </MenuItem>
                        <MenuItem
                          icon={<FaPlus size=".9em" />}
                          onClick={() => handlePageClick(`/item/create`)}
                          px={4}
                        >
                          New item
                        </MenuItem>
                        <MenuItem
                          icon={<FaPlus size=".9em" />}
                          onClick={() => handlePageClick(`/job/create`)}
                          px={4}
                        >
                          New job
                        </MenuItem>
                        <MenuItem
                          icon={<FaPlus size=".9em" />}
                          onClick={() => handlePageClick(`/project/create`)}
                          px={4}
                        >
                          New project
                        </MenuItem>
                        <MenuItem
                          icon={<FaPlus size=".9em" />}
                          onClick={() => handlePageClick(`/education/create`)}
                          px={4}
                        >
                          New education
                        </MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuItem
                        icon={<FaCog size=".9em" />}
                        onClick={() => handlePageClick("/settings")}
                        px={4}
                      >
                        Settings
                      </MenuItem>
                      <MenuItem
                        icon={<FaSignOutAlt size=".9em" />}
                        onClick={handleSignout}
                        px={4}
                      >
                        Sign out
                      </MenuItem>
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
