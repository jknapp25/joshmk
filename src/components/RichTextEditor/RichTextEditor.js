import React, { useMemo, useCallback, useRef } from "react";
import {
  createEditor,
  Editor,
  Transforms,
  Range,
  Element as SlateElement,
} from "slate";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Button } from "react-bootstrap";
import isHotkey from "is-hotkey";
import isUrl from "is-url";
import imageExtensions from "image-extensions";
import { withHistory } from "slate-history";
import {
  FaLink,
  FaImage,
  FaYoutube,
  FaBold,
  FaUnderline,
  FaItalic,
  FaCode,
  FaHeading,
  FaQuoteLeft,
  FaListOl,
  FaListUl,
  FaStrikethrough,
} from "react-icons/fa";

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

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const RichTextEditor = ({
  value = blankEditorValue,
  placeholder = "",
  onChange = () => {},
  readOnly = false,
  classes = "",
  buttons = [],
}) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () =>
      withVideos(withLinks(withImages(withHistory(withReact(createEditor()))))),
    []
  );

  return (
    <Slate editor={editor} value={value} onChange={(value) => onChange(value)}>
      {!readOnly ? (
        <div
          style={{
            borderTopLeftRadius: ".25em",
            borderTopRightRadius: ".25em",
          }}
          className="bg-gray-750 py-1 px-2 border border-bottom-0"
        >
          <MarkButton
            format="bold"
            icon={<FaBold />}
            disabled={!buttons.includes("bold")}
          />
          <MarkButton
            format="italic"
            icon={<FaItalic />}
            disabled={!buttons.includes("italic")}
          />
          <MarkButton
            format="underline"
            icon={<FaUnderline />}
            disabled={!buttons.includes("underline")}
          />
          <MarkButton
            format="strikethrough"
            icon={<FaStrikethrough />}
            disabled={!buttons.includes("strikethrough")}
          />
          <LinkButton
            disabled={!buttons.includes("link")}
            onMouseDown={(event) => {
              event.preventDefault();
              const url = window.prompt("Enter the URL of the link:");
              if (!url) return;
              insertLink(editor, url);
            }}
          />
          <MarkButton
            format="code"
            icon={<FaCode />}
            disabled={!buttons.includes("code")}
          />
          <BlockButton
            format="heading-one"
            icon={
              <>
                <FaHeading />1
              </>
            }
            disabled={!buttons.includes("heading-one")}
          />
          <BlockButton
            format="heading-two"
            icon={
              <>
                <FaHeading />2
              </>
            }
            disabled={!buttons.includes("heading-two")}
          />
          <BlockButton
            format="block-quote"
            icon={<FaQuoteLeft />}
            disabled={!buttons.includes("block-quote")}
          />
          <BlockButton
            format="numbered-list"
            icon={<FaListOl />}
            disabled={!buttons.includes("numbered-list")}
          />
          <BlockButton
            format="bulleted-list"
            icon={<FaListUl />}
            disabled={!buttons.includes("bulleted-list")}
          />
          <ImageButton disabled={!buttons.includes("image")} />
          <VideoButton disabled={!buttons.includes("video")} />
        </div>
      ) : null}
      <div
        style={
          !readOnly
            ? {
                borderBottomLeftRadius: ".25em",
                borderBottomRightRadius: ".25em",
                paddingLeft: "12px",
                paddingRight: "12px",
              }
            : {}
        }
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

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote {...attributes} className="border-left pl-2 fs-5">
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-two":
      return <h5 {...attributes}>{children}</h5>;
    case "list-item":
      return (
        <li {...attributes} className="fs-5">
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol {...attributes} className="fs-5">
          {children}
        </ol>
      );
    case "link":
      return (
        <a
          {...attributes}
          href={element.url}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          {children}
        </a>
      );
    case "video":
      return (
        <div {...attributes}>
          <div
            contentEditable={false}
            style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              title="YouTube video"
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
              src={element.url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded bg-secondary bg-opacity-10 shadow-lg"
            ></iframe>
          </div>
          {children}
        </div>
      );
    default:
      return (
        <p className="mb-0 fs-5" {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <strike>{children}</strike>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon, disabled = false }) => {
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

const MarkButton = ({ format, icon, disabled = false }) => {
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

const LinkButton = ({ disabled = false }) => {
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
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <FaLink />
    </Button>
  );
};

const ImageButton = ({ disabled = false }) => {
  const editor = useSlate();
  let imgInputRef = useRef();

  function handleImgUpload(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    const reader = new FileReader();
    // Executes after read is successful
    reader.onload = function (e) {
      try {
        insertImage(editor, e.target.result);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };
    reader.readAsDataURL(file);
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
      <input
        id="imgInput"
        type="file"
        ref={(ref) => (imgInputRef = ref)}
        style={{ display: "none" }}
        onChange={handleImgUpload}
      />
    </>
  );
};

const VideoButton = ({ disabled = false }) => {
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

const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
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
            const url = reader.result;
            insertImage(editor, url);
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

const withVideos = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "video" ? true : isVoid(element);
  return editor;
};

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = [
    {
      type: "image",
      url,
      children: [text],
    },
    {
      type: "paragraph",
      children: [text],
    },
  ];
  Transforms.insertNodes(editor, image);
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

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };
  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
};

export default RichTextEditor;
