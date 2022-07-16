import { Editor } from "slate";
import { useSlate } from "slate-react";
import { Button } from "react-bootstrap";

export const MarkButton = ({ format, icon, disabled = false }) => {
  const editor = useSlate();
  if (disabled) return null;
  return (
    <Button
      variant="light"
      className={`p-1 bg-transparent border-0 text-${
        isMarkActive(editor, format) ? "primary" : "secondary"
      }`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
