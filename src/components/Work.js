import React from "react";
import NavBar from "./Nav";
import Name from "./Name";
import { Alert } from "react-bootstrap";
import Timeline from "./Timeline";
import resume from "../assets/resume.pdf";
export default Work;

function Work({ work, handleTabsVisibilityChange }) {
  return (
    <>
      <Name />
      <NavBar handleTabsVisibilityChange={handleTabsVisibilityChange} />
      <Alert variant="info">
        Click{" "}
        <Alert.Link href={resume} download="Josh_Knapp_Resume">
          here
        </Alert.Link>{" "}
        for Josh's resume
      </Alert>
      <Timeline items={work} />
    </>
  );
}
