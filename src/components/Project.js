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
    <>
      <Card>
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
      </Card>
      {tags && tags.length > 0 && (
        <div
          style={{
            whiteSpace: "nowrap",
            overflowX: "scroll",
            boxShadow: "",
          }}
          className="mt-1"
        >
          {tags.map((tag) => (
            <Badge
              variant="lightgray"
              className="mr-2 cursor-pointer hover"
              onClick={() => navigate(`/search?tag=${tag}`)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </>
  );
}
