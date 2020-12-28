import React from "react";
import { Badge, Card } from "react-bootstrap";
import { navigate } from "@reach/router";
import { createTimeInfo } from "../lib/utils";
import { GoPencil } from "react-icons/go";
export default Education;

function Education({
  education,
  setEditingItemId,
  setItemType,
  showEdit = false,
}) {
  const {
    id,
    organization,
    degree,
    location,
    summary,
    details,
    organizationUrl,
    tags,
    start,
    end,
  } = education;
  const timeInfo = createTimeInfo(start, end, null, false);

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>
          {degree}{" "}
          {showEdit ? (
            <span
              onClick={() => {
                setItemType("education");
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
        <Card.Subtitle className="text-muted mb-2">
          {organization ? (
            <a
              href={organizationUrl || ""}
              target="_blank"
              rel="noreferrer noopener"
            >
              {organization}
            </a>
          ) : (
            organization
          )}{" "}
          {location && `- ${location}`}
        </Card.Subtitle>
        {summary ? (
          <Card.Text
            className={`${
              tags && tags.length > 0 ? "mb-2" : ""
            } font-weight-normal`}
          >
            {summary}
          </Card.Text>
        ) : null}
        {details && details.length > 0 ? (
          <Card.Text
            className={`${
              tags && tags.length > 0 ? "mb-2" : ""
            } font-weight-normal`}
          >
            <ul>
              {details.map((detail) => (
                <li>{detail}</li>
              ))}
            </ul>
          </Card.Text>
        ) : null}
        {tags && tags.length > 0 ? (
          <Card.Text
            style={{
              whiteSpace: "nowrap",
              overflowX: "scroll",
              boxShadow: "",
            }}
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
        ) : null}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{timeInfo}</small>
      </Card.Footer>
    </Card>
  );
}
