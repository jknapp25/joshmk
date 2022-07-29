import {
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

import { LinkButton, insertLink } from "./links";
import { ImageButton } from "./images";
import { VideoButton } from "./videos";
import { MarkButton } from "./marks";
import { BlockButton } from "./blocks";

const TOOLBAR_STYLES = {
  borderTopLeftRadius: ".25em",
  borderTopRightRadius: ".25em",
};

export default function ToolBar({ editor, readOnly, buttons }) {
  if (readOnly) return null;
  return (
    <div
      style={TOOLBAR_STYLES}
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
        format="kicker"
        icon={"K"}
        disabled={!buttons.includes("kicker")}
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
  );
}
