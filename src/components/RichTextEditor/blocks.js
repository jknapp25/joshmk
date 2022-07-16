import { Editor, Transforms, Element as SlateElement } from "slate";
import { useSlate } from "slate-react";
import { Button } from "react-bootstrap";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const BlockButton = ({ format, icon, disabled = false }) => {
  const editor = useSlate();
  if (disabled) return null;
  return (
    <Button
      variant="second"
      className={`p-1 bg-transparent border-0 text-${
        isBlockActive(editor, format) ? "primary" : "secondary"
      }`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  });

  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};
