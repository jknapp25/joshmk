import React, { useContext } from "react";
import { useMatch, Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import SideNavNew from "./SideNavNew";
import UserMiniSummary from "./UserMiniSummary";
import PopularTags from "./PopularTags";
import { ConfigContext } from "../App";

export default MainView;

function MainView() {
  const config = useContext(ConfigContext);

  const isHomeRoute = useMatch("/");
  const isGalleryRoute = useMatch("/gallery");
  const isCreateRoute = useMatch("/create");

  if (!config.pages || config.pages.length === 0) return null;

  const mainColWidth = isGalleryRoute || isCreateRoute ? 9 : 6;

  return (
    <Row>
      <Col
        lg={3}
        className="p-0 vh-100 d-none d-lg-flex align-items-center sticky"
      >
        <div className="p-5">
          <SideNavNew classes="mb-5" />
          {isHomeRoute ? <PopularTags /> : null}
        </div>
      </Col>
      <Col lg={mainColWidth} className="p-4 p-lg-5">
        <Outlet />
      </Col>
      {isHomeRoute ? (
        <Col
          lg={3}
          className="p-0 vh-100 d-none d-lg-flex align-items-center sticky"
        >
          <div className="p-5">
            <UserMiniSummary />
          </div>
        </Col>
      ) : null}
    </Row>
  );
}
