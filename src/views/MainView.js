import { useContext } from "react";
import { useMatch, Outlet } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import { Row, Col } from "react-bootstrap";
// import { Divider } from "@chakra-ui/react";

import Prompt from "../components/Prompt";
import UserMiniSummary from "../components/UserMiniSummary";
import PopularTags from "../components/PopularTags";
// import { Footer } from "./Footer";
import { ConfigContext } from "../App";

export default MainView;

function MainView() {
  const config = useContext(ConfigContext);

  const isHomeRoute = useMatch("/");
  const isGalleryRoute = useMatch("/gallery");
  const isCreateRoute = useMatch("/create");
  const isPostCreateRoute = useMatch("/post/create");
  const isPostRoute = useMatch("/post/:postId");
  const isItemRoute = useMatch("/item/:itemId");

  if (!config.pages || config.pages.length === 0) return null;

  let mainColWidth = isGalleryRoute || isCreateRoute ? 10 : 5;
  const secondaryColWidth = isGalleryRoute || isCreateRoute ? 2 : 3;

  if (isHomeRoute) mainColWidth = undefined;
  if (isPostRoute) mainColWidth = 8;
  if (isGalleryRoute) mainColWidth = 11;
  if (isItemRoute) mainColWidth = 8;
  if (isPostCreateRoute) mainColWidth = 6;

  return (
    <>
      <Row
        className="gx-lg-5 d-flex justify-content-center mx-auto"
        style={{ maxWidth: !isGalleryRoute ? "1920px" : undefined }}
      >
        {isHomeRoute ? (
          <Col lg={secondaryColWidth} className="d-none d-lg-grid">
            <VStack
              spacing={10}
              height="fit-content"
              py={12}
              paddingStart={3}
              paddingEnd={12}
              borderEnd={config?.prompts.length > 0 ? "1px" : undefined}
              borderColor="gray.200"
            >
              {config?.prompts.length > 0
                ? config.prompts.map((prompt, i) => (
                    <Prompt
                      key={i}
                      bottomSpace={i !== config.prompts.length - 1}
                      prompt={prompt}
                    />
                  ))
                : null}
            </VStack>
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
      {/* <Divider />
      <Footer /> */}
    </>
  );
}
