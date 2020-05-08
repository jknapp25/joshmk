import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import gql from "graphql-tag";
// import { useQuery } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
// import GoalHours from "./GoalHours";
// import Work from "./Work";
// import Projects from "./Projects";
// import Stories from "./Stories";
// import Skills from "./Skills";
import SideNav from "./SideNav";
import selfie from "../assets/ProfilePic.jpg";
// import initialItems from "../lib/items.json";
export default Home;

// const statusOrder = ["Active", "On Hold", "Complete"];

function Home({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const history = useHistory();
  // const { loading, data } = useQuery(GET_REPOS_DATES);

  // if (loading) return null;

  // const itemsEnrichedWithGithubData = initialItems.map(itm => {
  //   if (itm.hasRepo && data) {
  //     const { node } = data.viewer.repositories.edges.find(
  //       ({ node }) => node.name === itm.title
  //     );

  //     return {
  //       ...itm,
  //       start: node.createdAt,
  //       lastUpdated: node.updatedAt
  //     };
  //   } else {
  //     return itm;
  //   }
  // });

  // const projects = itemsEnrichedWithGithubData
  //   .filter(itm => itm.type === "projects")
  //   .sort(
  //     (a, b) =>
  //       statusOrder.indexOf(a.badgeText) - statusOrder.indexOf(b.badgeText)
  //   );
  // const stories = itemsEnrichedWithGithubData.filter(
  //   itm => itm.type === "stories"
  // );
  // const work = itemsEnrichedWithGithubData.filter(itm => itm.type === "work");

  // function handleTabsVisibilityChange(isVisible) {
  //   setShowSidebar(!isVisible);
  // }

  return (
    <Container>
      <Row>
        <Col className="text-right">
          {!showSidebar && (
            <img
              src={selfie}
              width="100"
              height="100"
              alt="Profile_picture"
              style={{ border: "3px solid black" }}
              className="mt-5 box align-top rounded-circle"
              onClick={() => history.push("/skills")}
            />
          )}
          <SideNav show={showSidebar} />
        </Col>
        <Col xs={7}>{children}</Col>
        <Col />
      </Row>
    </Container>
  );
}
