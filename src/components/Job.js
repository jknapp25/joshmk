import React from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { createTimeInfo } from "../lib/utils";
import { navigate } from "@reach/router";
import { GoPencil } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import { API, graphqlOperation } from "aws-amplify";
import { deleteJob } from "../graphql/mutations";
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

  async function deleteJb() {
    if (id) {
      await API.graphql(graphqlOperation(deleteJob, { input: { id } }));
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            {role}
            {type === "contract" ? (
              <Badge variant="secondary" className="ml-2">
                Contract
              </Badge>
            ) : null}{" "}
            {showEdit ? (
              <>
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
                <span
                  onClick={() => {
                    const shouldDelete = window.confirm("Delete the item?");
                    if (shouldDelete) {
                      deleteJb();
                    }
                  }}
                >
                  <FaTrashAlt
                    className="ml-2"
                    style={{
                      display: "inline",
                      cursor: "pointer",
                      color: "#dc3545",
                    }}
                  />
                </span>
              </>
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
            {companyUrl && location ? " - " : null}
            {location || null}
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
            <Accordion className="mt-3 border-0">
              <Card id="accordion-card-header-hide" className="border-0">
                <Card.Header className="p-0 border-bottom-0 bg-transparent border-0">
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                    className="pl-0 py-0 text-danger"
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
          <Card.Text>
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
