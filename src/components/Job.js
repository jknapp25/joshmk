import React from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { createTimeInfo } from "../lib/utils";
import Tag from "./Tag";
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
          <a href={companyUrl || ""} target="_blank" rel="noreferrer noopener">
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
        <ul>
          {details.map((detail, i) => (
            <li key={`detail-${i}`}>{detail}</li>
          ))}
        </ul>
      ) : null}
      <Card.Text>
        <small className="text-muted">{timeInfo}</small>
      </Card.Text>
      {tags && tags.length > 0 && (
        <div
          style={{
            whiteSpace: "nowrap",
            overflowX: "scroll",
            boxShadow: "",
          }}
          className="mt-1"
        >
          {tags.map((tag, i) => (
            <Tag tag={tag} key={`tag-${i}`} />
          ))}
        </div>
      )}
    </>
  );
}
