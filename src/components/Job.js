import React from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { navigate } from "@reach/router";
import { createTimeInfo } from "../lib/utils";
import { GoPencil } from "react-icons/go";
export default Job;

function Job({ job, setEditingItemId, setItemType, showEdit = false }) {
  const {
    id,
    company,
    role,
    location,
    summary,
    details,
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
          ) : null}{" "}
          {showEdit ? (
            <span
              onClick={() => {
                setItemType("job");
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
          {location ? `- ${location}` : null}
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
        {details ? (
          <Accordion className="mt-3">
            <Card className="bg-transparent">
              <Card.Header className="p-0 bg-transparent border-bottom-0">
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey="0"
                  className="pl-0"
                >
                  View details
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="bg-transparent px-0 pb-0">
                  <ul>
                    {details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
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
