import React from "react";
import Name from "./Name";
import NavBar from "./NavBar";
import Feed from "./Feed";
export default Stories;

function Stories({ stories, handleTabsVisibilityChange }) {
  return (
    <>
      <Name />
      <NavBar handleTabsVisibilityChange={handleTabsVisibilityChange} />
      <Feed items={stories} width="" type="stories" />
    </>
  );
}
