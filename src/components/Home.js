import React, { useState } from "react";
import { Router, navigate } from "@reach/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import Work from "./Work";
import Projects from "./Projects";
import Stories from "./Stories";
import Skills from "./Skills";
import SideNav from "./SideNav";
import selfie from "../assets/ProfilePic.jpg";
import initialItems from "../lib/items.json";
export default Home;

const GET_REPOS_DATES = gql`
  {
    viewer {
      repositories(last: 10) {
        edges {
          node {
            createdAt
            name
            updatedAt
          }
        }
      }
    }
  }
`;
const statusOrder = ["Active", "On Hold", "Complete"];

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { loading, data } = useQuery(GET_REPOS_DATES);

  if (loading) return null;

  const itemsEnrichedWithGithubData = initialItems.map(itm => {
    if (itm.hasRepo) {
      const { node } = data.viewer.repositories.edges.find(
        ({ node }) => node.name === itm.title
      );

      return {
        ...itm,
        start: node.createdAt,
        lastUpdated: node.updatedAt
      };
    } else {
      return itm;
    }
  });

  const projects = itemsEnrichedWithGithubData
    .filter(itm => itm.type === "projects")
    .sort(
      (a, b) =>
        statusOrder.indexOf(a.badgeText) - statusOrder.indexOf(b.badgeText)
    );
  const stories = itemsEnrichedWithGithubData.filter(
    itm => itm.type === "stories"
  );
  const work = itemsEnrichedWithGithubData.filter(itm => itm.type === "work");

  function handleTabsVisibilityChange(isVisible) {
    setShowSidebar(!isVisible);
  }

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
              onClick={() => navigate("/skills")}
            />
          )}
          <SideNav show={showSidebar} />
        </Col>
        <Col xs={7}>
          <Router primary={false}>
            <Work
              default
              work={work}
              path="/work"
              handleTabsVisibilityChange={handleTabsVisibilityChange}
            />
            <Projects
              handleTabsVisibilityChange={handleTabsVisibilityChange}
              projects={projects}
              path="/projects"
            />
            <Stories
              stories={stories}
              path="/stories"
              handleTabsVisibilityChange={handleTabsVisibilityChange}
            />
            <Skills path="/skills" />
          </Router>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}
