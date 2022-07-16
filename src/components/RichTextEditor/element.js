// import ImageCarouselReusable from "../ImageCarouselReusable";
import InlineImages from "../InlineImages";

export const Element = ({ attributes, children, element }) => {
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
    case "images":
      return <InlineImages attributes={attributes} images={element.filenames} />;
    default:
      return (
        <p className="mb-0 fs-5" {...attributes}>
          {children}
        </p>
      );
  }
};
