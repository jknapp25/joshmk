import React, { useState, useEffect } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";

import {
  deletePost,
  deleteItem,
  deleteJob,
  deleteProject,
  deleteEducation,
} from "../graphql/mutations";
import * as queries from "../graphql/queries";
import useIsMounted from "../lib/useIsMounted";

export default withAuthenticator(Create);

const TABLE_FIELDS = {
  post: ["title", "category", "createdAt"],
  item: ["name", "category", "createdAt"],
  job: ["role", "company", "location"],
  project: ["name", "status"],
  education: ["organization", "degree"],
};

function Create() {
  const [items, setItems] = useState([]);
  const [itemType, setItemType] = useState("post");

  const isMounted = useIsMounted();
  const navigate = useNavigate();

  async function deleteEntity(type, id) {
    if (!type || !id) return;

    let mutation = null;
    if (itemType === "post") {
      mutation = deletePost;
    } else if (itemType === "item") {
      mutation = deleteItem;
    } else if (itemType === "job") {
      mutation = deleteJob;
    } else if (itemType === "project") {
      mutation = deleteProject;
    } else if (itemType === "education") {
      mutation = deleteEducation;
    }

    if (mutation) {
      await API.graphql(graphqlOperation(mutation, { input: { id } }));
    }
  }

  useEffect(() => {
    async function fetchData() {
      let query = null;

      if (itemType === "post") {
        query = "listPosts";
      } else if (itemType === "item") {
        query = "listItems";
      } else if (itemType === "job") {
        query = "listJobs";
      } else if (itemType === "project") {
        query = "listProjects";
      } else if (itemType === "education") {
        query = "listEducations";
      }

      if (query) {
        const data = await API.graphql({ query: queries[query] });
        const fetchedItems = data.data[query].items;
        if (isMounted.current) setItems(fetchedItems);
      }
    }
    fetchData();
  }, [isMounted, itemType]);

  let sortedItems = items.sort(function (a, b) {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else if (b.createdAt < a.createdAt) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="mb-5">
        <Dropdown size="lg" className="d-inline">
          <Dropdown.Toggle
            variant="light"
            size="lg"
            className="bg-transparent p-0 text-capitalize border-0"
          >
            {itemType}
            {["post", "item", "job", "project"].includes(itemType) ? "s" : ""}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {["post", "item", "job", "project", "education"].map((type) => (
              <Dropdown.Item
                onClick={() => setItemType(type)}
                className="text-capitalize"
              >
                {type}
                {["post", "item", "job", "project"].includes(type) ? "s" : ""}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          variant="primary"
          className="float-end"
          onClick={() => navigate(`/${itemType}/create`)}
        >
          Create
        </Button>
      </div>

      <Table hover className="cursor-pointer">
        <thead>
          <tr>
            {TABLE_FIELDS[itemType].map((field) => (
              <th className="px-0">{field}</th>
            ))}
            <th className="px-0"></th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.length > 0 ? (
            sortedItems.map((item, i) => {
              return (
                <tr key={i} onClick={() => navigate(`/${itemType}/${item.id}`)}>
                  {TABLE_FIELDS[itemType].map((field) => (
                    <td className="px-0">{item[field]}</td>
                  ))}
                  <td className="px-0">
                    <span
                      className="me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/${itemType}/${item.id}/edit`);
                      }}
                    >
                      <GoPencil
                        style={{
                          display: "inline",
                          cursor: "pointer",
                          color: "#6c757d",
                        }}
                      />
                    </span>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const shouldDelete = window.confirm("Delete the item?");
                        if (shouldDelete) {
                          deleteEntity(itemType, item.id);
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
                  </td>
                </tr>
              );
            })
          ) : (
            <div>No items</div>
          )}
        </tbody>
      </Table>
    </>
  );
}
