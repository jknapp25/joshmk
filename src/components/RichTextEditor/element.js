import InlineImages from "../InlineImages";

export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          {...attributes}
          className="border-start border-dark border-2 ps-3 fst-italic fs-5 mb-0 mx-auto"
          style={{ maxWidth: "650px" }}
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul {...attributes} className="mx-auto" style={{ maxWidth: "650px" }}>
          {children}
        </ul>
      );
    case "kicker":
      return (
        <p
          className="text-muted text-uppercase small mx-auto"
          style={{
            fontWeight: 500,
            maxWidth: "650px",
          }}
          {...attributes}
        >
          {children}
        </p>
      );
    case "heading-one":
      return (
        <h3 {...attributes} className="mx-auto" style={{ maxWidth: "650px" }}>
          {children}
        </h3>
      );
    case "heading-two":
      return (
        <h5 {...attributes} className="mx-auto" style={{ maxWidth: "650px" }}>
          {children}
        </h5>
      );
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
              className="bg-secondary bg-opacity-10"
            ></iframe>
          </div>
          {children}
        </div>
      );
    case "images":
      return (
        <InlineImages attributes={attributes} images={element.filenames} />
      );
    default:
      return (
        <p
          className="fs-5 mx-auto"
          style={{ maxWidth: "650px" }}
          {...attributes}
        >
          {children}
        </p>
      );
  }
};
