import React from "react";
import { Badge, Card } from "react-bootstrap";
import ImageCarousel from "./ImageCarousel";
import { Link } from "@reach/router";
import { createTimeInfo, statusColorLookup } from "../lib/utils";
import { GoPencil } from "react-icons/go";
import { FaTag } from "react-icons/fa";
export default Project;

function Project({ project, setEditingItemId, setItemType, showEdit = false }) {
  const { id, name, tags, summary, status, link, images, start, end } = project;
  const timeInfo = createTimeInfo(start, end, null, false);

  return (
    <Card className="mb-4">
      <ImageCarousel images={images} />

      <Card.Body>
        <Card.Title>
          {link ? (
            <a href={link} target="_blank" rel="noreferrer noopener">
              {name}
            </a>
          ) : (
            name
          )}
          {status ? (
            <Badge variant={statusColorLookup[status]} className="ml-2">
              {status}
            </Badge>
          ) : null}{" "}
          {showEdit ? (
            <span
              onClick={() => {
                setItemType("project");
                setEditingItemId(id);
                window.scrollTo(0, 0);
              }}
            >
              <GoPencil
                color="secondary"
                style={{
                  display: "inline",
                  cursor: "pointer",
                  color: "#6c757d",
                }}
              />
            </span>
          ) : null}
        </Card.Title>
        {summary ? (
          <Card.Text className="font-weight-normal">{summary}</Card.Text>
        ) : null}
        <Card.Text className="mt-2">
          <small className="text-muted">{timeInfo}</small>
        </Card.Text>
      </Card.Body>
      <Card.Footer
        style={{
          whiteSpace: "nowrap",
          overflowX: "scroll",
          boxShadow: "",
        }}
      >
        <FaTag
          className="mr-2 d-inline"
          style={{
            color: "rgba(108, 117, 125, 0.7)",
          }}
        />
        {tags.map((tag, i) => (
          <>
            <Link to={`/search?tag=${tag}`}>{tag}</Link>
            {i !== tags.length - 1 ? (
              <span style={{ color: "rgba(108, 117, 125, 0.7)" }}>, </span>
            ) : (
              ""
            )}
          </>
        ))}
      </Card.Footer>
    </Card>
  );
}
