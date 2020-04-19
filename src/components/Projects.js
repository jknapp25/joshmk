import React from "react";
import Name from "./Name";
import NavBar from "./Nav";
import Feed from "./Feed";
export default Projects;

function Projects({ projects, handleTabsVisibilityChange }) {
  return (
    <>
      <Name />
      <NavBar handleTabsVisibilityChange={handleTabsVisibilityChange} />
      <Feed items={projects} width="w-50" type="projects" />
    </>
  );
}
