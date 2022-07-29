import React, { useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Editable, withReact, Slate } from "slate-react";
import isHotkey from "is-hotkey";
import { withHistory } from "slate-history";

import { withLinks } from "./links";
import { withImages } from "./images";
import { withVideos } from "./videos";
import { toggleMark } from "./marks";
import { Element } from "./element";
import { Leaf } from "./leaf";
import Toolbar from "./Toolbar";

const blankEditorValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const EDITOR_STYLES = {
  borderBottomLeftRadius: ".25em",
  borderBottomRightRadius: ".25em",
  paddingLeft: "12px",
  paddingRight: "12px",
};

// function removeSpacesOnEnds(content) {
//   let updatedContent = content;

//   const isSpace = (val) =>
//     val.type === "paragraph" &&
//     val.children.length === 1 &&
//     val.children.text === "";

//   // remove from start
//   for (let i = 0; i < content.length; i++) {
//     if (isSpace(content[i])) {
//       updatedContent.shift();
//     }
//   }

//   // remove from end
//   for (let i = content.length - 1; i < 0; i--) {
//     if (isSpace(content[i])) {
//       updatedContent.pop();
//     }
//   }

//   return updatedContent;
// }

export default function RichTextEditor({
  value = blankEditorValue,
  placeholder = "",
  onChange = () => {},
  readOnly = false,
  classes = "",
  buttons = [],
}) {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () =>
      withVideos(withLinks(withImages(withHistory(withReact(createEditor()))))),
    []
  );

  editor.children = value;

  return (
    <Slate editor={editor} value={value} onChange={(value) => onChange(value)}>
      <Toolbar editor={editor} readOnly={readOnly} buttons={buttons} />
      <div
        style={!readOnly ? EDITOR_STYLES : {}}
        className={!readOnly ? `py-2 border ${classes}` : classes}
      >
        <Editable
          readOnly={readOnly}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </div>
    </Slate>
  );
}
