import React, { useContext } from "react";
import { useMatch, Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import ImagePrompt from "./ImagePrompt";
import UserMiniSummary from "./UserMiniSummary";
import PopularTags from "./PopularTags";
import { ConfigContext } from "../App";

export default MainView;

function MainView() {
  const config = useContext(ConfigContext);

  const isHomeRoute = useMatch("/");
  const isGalleryRoute = useMatch("/gallery");
  const isCreateRoute = useMatch("/create");
  const isPostRoute = useMatch("/post/:postId");

  if (!config.pages || config.pages.length === 0) return null;

  let mainColWidth = isGalleryRoute || isCreateRoute ? 10 : 5;
  const secondaryColWidth = isGalleryRoute || isCreateRoute ? 2 : 3;

  if (isHomeRoute) mainColWidth = undefined;
  if (isPostRoute) mainColWidth = 8;

  return (
    <Row
      className="gx-lg-5 d-flex justify-content-center mx-auto"
      style={{ maxWidth: "1920px" }}
    >
      {isHomeRoute ? (
        <Col lg={secondaryColWidth} className="d-none d-lg-grid">
          <div
            className="py-5 ps-3 pe-5 vh-auto border-end"
            style={{ height: "fit-content" }}
          >
            {config.prompts && config.prompts.length > 0
              ? config.prompts.map((postId, i) => (
                  <ImagePrompt
                    key={i}
                    bottomSpace={i === config.prompts.length - 1}
                    postId={postId}
                  />
                ))
              : null}
          </div>
        </Col>
      ) : null}
      <Col lg={mainColWidth} className="py-5">
        <Outlet />
      </Col>
      {isHomeRoute ? (
        <Col lg={secondaryColWidth} className="d-none d-lg-grid">
          <div
            className="py-5 pe-3 ps-5 vh-auto border-start"
            style={{ height: "fit-content" }}
          >
            <UserMiniSummary />
            {isHomeRoute ? <PopularTags /> : null}
          </div>
        </Col>
      ) : null}
    </Row>
  );
}
