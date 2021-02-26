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
        <blockquote {...attributes} className="border-left pl-2">
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
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
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
            ></iframe>
          </div>
          {children}
        </div>
      );
    default:
      return (
        <p className="mb-0" {...attributes}>
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

// const CustomEditor = {
//   isBoldMarkActive(editor) {
//     const [match] = Editor.nodes(editor, {
//       match: (n) => n.bold === true,
//       universal: true,
//     });
//     return !!match;
//   },
//   isItalicMarkActive(editor) {
//     const [match] = Editor.nodes(editor, {
//       match: (n) => n.italic === true,
//       universal: true,
//     });
//     return !!match;
//   },
//   isUnderlineMarkActive(editor) {
//     const [match] = Editor.nodes(editor, {
//       match: (n) => n.underline === true,
//       universal: true,
//     });
//     return !!match;
//   },
//   toggleBoldMark(editor) {
//     const isActive = CustomEditor.isBoldMarkActive(editor);
//     Transforms.setNodes(
//       editor,
//       { bold: isActive ? null : true },
//       { match: (n) => Text.isText(n), split: true }
//     );
//   },
//   toggleItalicMark(editor) {
//     const isActive = CustomEditor.isItalicMarkActive(editor);
//     Transforms.setNodes(
//       editor,
//       { italic: isActive ? null : true },
//       { match: (n) => Text.isText(n), split: true }
//     );
//   },
//   toggleUnderlineMark(editor) {
//     const isActive = CustomEditor.isUnderlineMarkActive(editor);
//     Transforms.setNodes(
//       editor,
//       { underline: isActive ? null : true },
//       { match: (n) => Text.isText(n), split: true }
//     );
//   },
// };

// const RichTextEditor = ({
//   value = blankEditorValue,
//   placeholder = "",
//   onChange = () => {},
//   readOnly = false,
//   classes = "",
//   buttons = [],
// }) => {
//   const editor = useMemo(
//     () =>
//       withEmbeds(withLinks(withImages(withHistory(withReact(createEditor()))))),
//     []
//   );

//   let imgInputRef = useRef();

//   const renderElement = useCallback((props) => {
//     switch (props.element.type) {
//       case "code":
//         return <CodeElement {...props} />;
//       case "image":
//         return <ImageElement {...props} />;
//       case "link":
//         return <LinkElement {...props} />;
//       case "video":
//         return <VideoElement {...props} />;
//       default:
//         return <DefaultElement {...props} />;
//     }
//   }, []);

//   const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

//   function handleImgUpload(event) {
//     event.stopPropagation();
//     event.preventDefault();
//     var file = event.target.files[0];
//     const reader = new FileReader();
//     // Executes after read is successful
//     reader.onload = function (e) {
//       try {
//         insertImage(editor, e.target.result);
//       } catch (e) {
//         // eslint-disable-next-line no-console
//         console.log(e);
//       }
//     };
//     reader.readAsDataURL(file);
//   }

//   return (
//     <Slate
//       editor={editor}
//       value={value}
//       onChange={(value) => {
//         onChange(value);
//       }}
//     >
//       {!readOnly ? (
//         <div
//           style={{
//             borderTopLeftRadius: ".25em",
//             borderTopRightRadius: ".25em",
//           }}
//           className="bg-gray-750 py-1 px-2 border border-bottom-0"
//         >
//           {buttons.includes("bold") ? (
//             <Button
//               variant="light"
//               className="p-1 bg-transparent border-0"
//               onMouseDown={(event) => {
//                 event.preventDefault();
//                 CustomEditor.toggleBoldMark(editor);
//               }}
//             >
//               <span className="font-weight-bold">B</span>
//             </Button>
//           ) : null}
//           {buttons.includes("italic") ? (
//             <Button
//               variant="light"
//               className="p-1 ml-1 bg-transparent border-0"
//               onMouseDown={(event) => {
//                 event.preventDefault();
//                 CustomEditor.toggleItalicMark(editor);
//               }}
//             >
//               <em>I</em>
//             </Button>
//           ) : null}
//           {buttons.includes("underline") ? (
//             <Button
//               variant="light"
//               className="p-1 ml-1 bg-transparent border-0"
//               onMouseDown={(event) => {
//                 event.preventDefault();
//                 CustomEditor.toggleUnderlineMark(editor);
//               }}
//             >
//               <u>U</u>
//             </Button>
//           ) : null}
//           {buttons.includes("link") ? (
//             <Button
//               variant="light"
//               className="p-1 ml-1 bg-transparent border-0"
//               onMouseDown={(event) => {
//                 event.preventDefault();
//                 const url = window.prompt("Enter the URL of the link:");
//                 if (!url) return;
//                 insertLink(editor, url);
//               }}
//             >
//               <FaLink />
//             </Button>
//           ) : null}
//           {buttons.includes("image") ? (
//             <>
//               <Button
//                 variant="light"
//                 className="p-1 ml-1 bg-transparent border-0"
//                 onClick={() => imgInputRef.click()}
//               >
//                 <FaImage />
//               </Button>
//               <input
//                 id="imgInput"
//                 type="file"
//                 ref={(ref) => (imgInputRef = ref)}
//                 style={{ display: "none" }}
//                 onChange={handleImgUpload}
//               />
//             </>
//           ) : null}
//           {buttons.includes("video") ? (
//             <Button
//               variant="light"
//               className="p-1 ml-1 bg-transparent border-0"
//               onMouseDown={(event) => {
//                 event.preventDefault();
//                 const url = window.prompt(
//                   "Enter the embed URL of the YouTube video:"
//                 );
//                 if (!url) return;
//                 insertVideo(editor, url);
//               }}
//             >
//               <FaYoutube style={{ color: "black" }} />
//             </Button>
//           ) : null}
//         </div>
//       ) : null}
//       <div
//         style={
//           !readOnly
//             ? {
//                 borderBottomLeftRadius: ".25em",
//                 borderBottomRightRadius: ".25em",
//                 paddingLeft: "12px",
//                 paddingRight: "12px",
//               }
//             : {}
//         }
//         className={!readOnly ? `py-2 border ${classes}` : classes}
//       >
//         <Editable
//           placeholder={placeholder}
//           readOnly={readOnly}
//           renderElement={renderElement}
//           renderLeaf={renderLeaf}
//           onKeyDown={(event) => {
//             if (!event.ctrlKey) {
//               return;
//             }
//             // Replace the `onKeyDown` logic with our new commands.
//             switch (event.key) {
//               case "`": {
//                 event.preventDefault();
//                 CustomEditor.toggleCodeBlock(editor);
//                 break;
//               }
//               case "b": {
//                 event.preventDefault();
//                 CustomEditor.toggleBoldMark(editor);
//                 break;
//               }
//               case "i": {
//                 event.preventDefault();
//                 CustomEditor.toggleItalicMark(editor);
//                 break;
//               }
//               case "u": {
//                 event.preventDefault();
//                 CustomEditor.toggleUnderlineMark(editor);
//                 break;
//               }
//               default:
//                 break;
//             }
//           }}
//         />
//       </div>
//     </Slate>
//   );
// };

// const withImages = (editor) => {
//   const { insertData, isVoid } = editor;

//   editor.isVoid = (element) => {
//     return element.type === "image" ? true : isVoid(element);
//   };

//   editor.insertData = (data) => {
//     const text = data.getData("text/plain");
//     const { files } = data;
//     if (files && files.length > 0) {
//       for (const file of files) {
//         const reader = new FileReader();
//         const [mime] = file.type.split("/");
//         if (mime === "image") {
//           reader.addEventListener("load", () => {
//             const url = reader.result;
//             insertImage(editor, url);
//           });
//           reader.readAsDataURL(file);
//         }
//       }
//     } else if (isImageUrl(text)) {
//       insertImage(editor, text);
//     } else {
//       insertData(data);
//     }
//   };

//   return editor;
// };

// const withEmbeds = (editor) => {
//   const { isVoid } = editor;
//   editor.isVoid = (element) =>
//     element.type === "video" ? true : isVoid(element);
//   return editor;
// };

// const insertImage = (editor, url) => {
//   const text = { text: "" };
//   const image = [
//     {
//       type: "image",
//       url,
//       children: [text],
//     },
//     {
//       type: "paragraph",
//       children: [text],
//     },
//   ];
//   Transforms.insertNodes(editor, image);
// };

// const insertVideo = (editor, url) => {
//   const text = { text: "" };
//   const video = [
//     {
//       type: "video",
//       url,
//       children: [text],
//     },
//     {
//       type: "paragraph",
//       children: [text],
//     },
//   ];
//   Transforms.insertNodes(editor, video);
// };

// const DefaultElement = (props) => {
//   return (
//     <p className="mb-0" {...props.attributes}>
//       {props.children}
//     </p>
//   );
// };

// const CodeElement = (props) => {
//   return (
//     <pre {...props.attributes}>
//       <code>{props.children}</code>
//     </pre>
//   );
// };

// const LinkElement = ({ attributes, children, element }) => {
//   switch (element.type) {
//     case "link":
//       return (
//         <a
//           {...attributes}
//           href={element.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="cursor-pointer"
//         >
//           {children}
//         </a>
//       );
//     default:
//       return <p {...attributes}>{children}</p>;
//   }
// };

// const ImageElement = ({ attributes, children, element }) => {
//   const selected = useSelected();
//   const focused = useFocused();
//   return (
//     <div {...attributes}>
//       <div contentEditable={false}>
//         <img
//           alt={element.url}
//           src={element.url}
//           style={{
//             display: "block",
//             maxWidth: "100%",
//             maxHeight: "20em",
//             boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : "none",
//           }}
//         />
//       </div>
//       {children}
//     </div>
//   );
// };

// const VideoElement = ({ attributes, children, element }) => {
//   return (
//     <div {...attributes}>
//       <div
//         contentEditable={false}
//         style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
//       >
//         <iframe
//           title="YouTube video"
//           width="100%"
//           height="100%"
//           style={{ position: "absolute", top: 0, left: 0 }}
//           src={element.url}
//           frameborder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowfullscreen
//         ></iframe>
//       </div>
//       {children}
//     </div>
//   );
// };

// const withLinks = (editor) => {
//   const { insertData, insertText, isInline } = editor;

//   editor.isInline = (element) => {
//     return element.type === "link" ? true : isInline(element);
//   };

//   editor.insertText = (text) => {
//     if (text && isUrl(text)) {
//       wrapLink(editor, text);
//     } else {
//       insertText(text);
//     }
//   };

//   editor.insertData = (data) => {
//     const text = data.getData("text/plain");
//     if (text && isUrl(text)) {
//       wrapLink(editor, text);
//     } else {
//       insertData(data);
//     }
//   };

//   return editor;
// };

// const insertLink = (editor, url) => {
//   if (editor.selection) {
//     wrapLink(editor, url);
//   }
// };

// const isLinkActive = (editor) => {
//   const [link] = Editor.nodes(editor, {
//     match: (n) =>
//       !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
//   });
//   return !!link;
// };

// const isBlockActive = (editor, format) => {
//   const [match] = Editor.nodes(editor, {
//     match: (n) =>
//       !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
//   });
//   return !!match;
// };

// const isMarkActive = (editor, format) => {
//   const marks = Editor.marks(editor);
//   return marks ? marks[format] === true : false;
// };

// const unwrapLink = (editor) => {
//   Transforms.unwrapNodes(editor, {
//     match: (n) =>
//       !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
//   });
// };

// const wrapLink = (editor, url) => {
//   if (isLinkActive(editor)) {
//     unwrapLink(editor);
//   }
//   const { selection } = editor;
//   const isCollapsed = selection && Range.isCollapsed(selection);
//   const link = {
//     type: "link",
//     url,
//     children: isCollapsed ? [{ text: url }] : [],
//   };
//   if (isCollapsed) {
//     Transforms.insertNodes(editor, link);
//   } else {
//     Transforms.wrapNodes(editor, link, { split: true });
//     Transforms.collapse(editor, { edge: "end" });
//   }
// };

// const isImageUrl = (url) => {
//   if (!url) return false;
//   if (!isUrl(url)) return false;
//   const ext = new URL(url).pathname.split(".").pop();
//   return imageExtensions.includes(ext);
// };

// const Leaf = ({ attributes, children, leaf }) => {
//   if (leaf.bold) {
//     children = <strong>{children}</strong>;
//   }
//   if (leaf.code) {
//     children = <code>{children}</code>;
//   }
//   if (leaf.italic) {
//     children = <em>{children}</em>;
//   }
//   if (leaf.underline) {
//     children = <u>{children}</u>;
//   }
//   return <span {...attributes}>{children}</span>;
// };

// export default RichTextEditor;
