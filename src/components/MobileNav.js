import React, { useState } from "react";
import { Row, Col, Offcanvas } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

import SideNavNew from "./SideNavNew";

export default MobileNav;

function MobileNav({ fullName }) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <>
      <Row className="py-2 border-bottom py-3 sticky-top bg-white d-md-block d-lg-none">
        <Col className="d-flex justify-content-between px-4 align-items-center">
          {fullName ? <h2 className="mb-0">{fullName}</h2> : null}
          <span className="cursor-pointer" onClick={handleShow}>
            <FaBars size="2em" title="clear search" className="float-end" />
          </span>
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
