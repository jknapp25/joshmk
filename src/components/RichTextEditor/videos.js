import { Transforms } from "slate";
import { useSlate } from "slate-react";
import { Button } from "react-bootstrap";
import { FaYoutube } from "react-icons/fa";

import { isMarkActive } from "./marks";

export const VideoButton = ({ disabled = false }) => {
  const editor = useSlate();
  if (disabled) return null;
  return (
    <Button
      variant="light"
      className={`p-1 bg-transparent border-0 text-${
        isMarkActive(editor, "link") ? "primary" : "secondary"
      }`}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the embed URL of the YouTube video:");
        if (!url) return;
        insertVideo(editor, url);
      }}
    >
      <FaYoutube />
    </Button>
  );
};

export const withVideos = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "video" ? true : isVoid(element);
  return editor;
};

const insertVideo = (editor, url) => {
  const text = { text: "" };
  const video = [
    {
      type: "video",
      url,
      children: [text],
    },
    {
      type: "paragraph",
      children: [text],
    },
  ];
  Transforms.insertNodes(editor, video);
};
