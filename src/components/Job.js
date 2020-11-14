import React from "react";
import { Badge, Card } from "react-bootstrap";
import { navigate } from "@reach/router";
import { createTimeInfo } from "../lib/utils";
export default Job;

function Job({ job }) {
  const {
    company,
    role,
    location,
    summary,
    companyUrl,
    tags,
    type,
    start,
    end,
  } = job;
  const timeInfo = createTimeInfo(start, end, null, false);

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>
          {role}
          {type === "contract" ? (
            <Badge variant="secondary" className="ml-2">
              Contract
            </Badge>
          ) : null}
        </Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          {companyUrl ? (
            <a
              href={companyUrl || ""}
              target="_blank"
              rel="noreferrer noopener"
            >
              {company}
            </a>
          ) : (
            company
          )}{" "}
          {location && `- ${location}`}
        </Card.Subtitle>
        {summary && (
          <Card.Text
            className={`${
              tags && tags.length > 0 ? "mb-2" : ""
            } font-weight-normal`}
          >
            {summary}
          </Card.Text>
        )}
        {tags && tags.length > 0 && (
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
                onClick={() => navigate(`?search=${tag}`)}
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
