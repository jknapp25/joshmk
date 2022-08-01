import React from "react";

import RichTextEditor from "./RichTextEditor/RichTextEditor";

export default Bio;

function Bio({ bio }) {
  if (!bio) return null;
  bio = JSON.parse(bio);
  return (
    <RichTextEditor
      value={bio}
      onChange={() => {}}
      readOnly={true}
      buttons={[
        "bold",
        "italic",
        "underline",
        "code",
        "strikethrough",
        "heading-one",
        "heading-two",
        "block-quote",
        "numbered-list",
        "bulleted-list",
        "link",
        "video",
      ]}
    />
  );
}
