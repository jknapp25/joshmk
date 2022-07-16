import React, { useRef } from "react";
import imageExtensions from "image-extensions";
import { FaImage } from "react-icons/fa";
import { Transforms } from "slate";
import { useSlate } from "slate-react";
import { Button, Form } from "react-bootstrap";
import isUrl from "is-url";

import uploadImages from "../../lib/uploadImages";

export const ImageButton = ({ disabled = false }) => {
  const editor = useSlate();
  let imgInputRef = useRef();

  async function handleImgUpload(event) {
    event.stopPropagation();
    event.preventDefault();

    const uploadedImageUrls = await uploadImages(
      event.target.files,
      true,
      5,
      "Image"
    );

    insertImage(editor, uploadedImageUrls);
  }

  if (disabled) return null;
  return (
    <>
      <Button
        variant="light"
        className={`p-1 bg-transparent border-0 text-secondary`}
        onMouseDown={() => imgInputRef.click()}
      >
        <FaImage />
      </Button>
      <Form.Control
        id="imgInput"
        type="file"
        className="mb-2 d-none"
        ref={(ref) => (imgInputRef = ref)}
        multiple={true}
        onChange={handleImgUpload}
      />
    </>
  );
};

export const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "images" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;
    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");
        if (mime === "image") {
          reader.addEventListener("load", () => {
            const filename = reader.result;
            insertImage(editor, filename);
          });
          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, filenames) => {
  const text = { text: "" };
  const image = [
    {
      type: "images",
      filenames,
      layout: "carousel",
      children: [text],
    },
    {
      type: "paragraph",
      children: [text],
    },
  ];
  Transforms.insertNodes(editor, image);
};

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};
