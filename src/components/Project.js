import React from "react";
import { Badge, Card } from "react-bootstrap";
import ImageCarousel from "./ImageCarousel";
import { navigate } from "@reach/router";
import { createTimeInfo, statusColorLookup } from "../lib/utils";
import { GoPencil } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import { API, graphqlOperation } from "aws-amplify";
import { deleteProject } from "../graphql/mutations";
export default Project;

function Project({ project, setEditingItemId, setItemType, showEdit = false }) {
  const { id, name, tags, summary, status, link, images, start, end } = project;
  const timeInfo = createTimeInfo(start, end, null, false);

  async function deleteProjekt() {
    if (id) {
      await API.graphql(graphqlOperation(deleteProject, { input: { id } }));
    }
  }

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
              <>
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
                <span
                  onClick={() => {
                    const shouldDelete = window.confirm("Delete the item?");
                    if (shouldDelete) {
                      deleteProjekt();
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
