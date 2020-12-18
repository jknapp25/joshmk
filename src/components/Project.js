import React from "react";
import { Badge, Card } from "react-bootstrap";
import ImageCarousel from "./ImageCarousel";
import { navigate } from "@reach/router";
import { createTimeInfo, statusColorLookup } from "../lib/utils";
import { GoPencil } from "react-icons/go";
export default Project;

function Project({ project, setEditingItemId, setItemType, showEdit = false }) {
  const { id, name, tags, summary, status, link, images, start, end } = project;
  const timeInfo = createTimeInfo(start, end, null, false);

  return (
    <Card className="mb-4">
      <ImageCarousel images={images} classes="mb-3" />

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
        {tags && tags.length > 0 && (
          <Card.Text
            style={{
              whiteSpace: "nowrap",
              overflowX: "scroll",
              boxShadow: "",
            }}
            className="mt-2"
          >
            {tags.map((tag, i) => (
              <Badge
                pill
                variant="transparent"
                className="mr-2"
                key={i}
                onClick={() => navigate(`/search?tag=${tag}`)}
              >
                {tag}
              </Badge>
            ))}
          </Card.Text>
        )}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{timeInfo}</small>
      </Card.Footer>
    </Card>
  );
}
