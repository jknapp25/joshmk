import React, { useState } from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import VisibilitySensor from "react-visibility-sensor";
import Feed from "./components/Feed";
import Work from "./components/Work";
import SideNav from "./components/SideNav";
import selfie from "./assets/ProfilePic.jpg";
import projects from "./lib/projects.json";
import stories from "./lib/stories.json";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
export default App;

function App() {
  const [activePage, setActivePage] = useState("work");
  const [showSidebar, setShowSidebar] = useState(false);

  function onChange(isVisible) {
    setShowSidebar(!isVisible);
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="text-right">
            {!showSidebar && (
              <img
                src={selfie}
                width="100"
                height="100"
                alt="Profile_picture"
                style={{
                  border: "3px solid black"
                }}
                className="mt-5 box align-top rounded-circle"
              />
            )}
            <SideNav
              show={showSidebar}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </Col>
          <Col xs={7}>
            <h1 className="display-2 mt-5">Josh Knapp</h1>
            <VisibilitySensor onChange={onChange} partialVisibility={true}>
              <Tabs
                id="controlled-tab-example"
                activeKey={activePage}
                onSelect={setActivePage}
                className="border-0"
              >
                <Tab
                  eventKey="work"
                  title="work"
                  className="pt-4 border-0 mb-4"
                >
                  <Work />
                </Tab>
                <Tab
                  eventKey="projects"
                  title="projects"
                  className="pt-4 border-0"
                >
                  <Feed content={projects} width="w-50" type="projects" />
                </Tab>
                <Tab
                  eventKey="stories"
                  title="stories"
                  className="pt-4 border-0"
                >
                  <Feed content={stories} width="" type="stories" />
                </Tab>
              </Tabs>
            </VisibilitySensor>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
}
