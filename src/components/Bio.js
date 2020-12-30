import React from "react";
import RichTextEditor from "./RichTextEditor";
export default Bio;

function Bio({ bio }) {
  if (!bio) return null;
  bio = JSON.parse(bio);
  return <RichTextEditor value={bio} onChange={() => {}} readOnly={true} />;
}
