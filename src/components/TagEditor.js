import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
export default TagEditor;

function TagEditor({ tags, onChange }) {
  const [activeTag, setActiveTag] = useState("");

  function addTag() {
    if (!activeTag) return;

    const updTags = [...tags, activeTag];
    setActiveTag("");
    onChange(updTags);
  }

  function deleteTag(i) {
    const updTags = [...tags];
    updTags.splice(i, 1);
    onChange(updTags);
  }

  return (
    <>
      <Form.Label className="mb-0 mt-2">Tags</Form.Label>
      <FormControl
        id="activetag"
        aria-describedby="activetag"
        value={activeTag || ""}
        onChange={(e) => setActiveTag(e.target.value)}
      />
      <Button
        variant="link"
        size="sm"
        className="mt-2 mb-1 pl-0 pt-0"
        onClick={addTag}
      >
        Add
      </Button>
      <ul>
        {tags.map((tag, i) => (
          <li>
            {tag}{" "}
            <span onClick={() => deleteTag(i)}>
              <FaTimes
                className="ml-2 d-inline cursor-pointer"
                color="#dc3545"
                title="delete tag"
              />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
