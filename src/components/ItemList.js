import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import Timeline from "./Timeline";
import Resume from "./Resume";
import { useLocation } from "@reach/router";
import { parse } from "query-string";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import Post from "./Post";
import Project from "./Project";
export default ItemList;

const statusOrder = ["Active", "On Hold", "Complete"];

function ItemList() {
  const { pathname, search } = useLocation();
  const searchParams = parse(search);
  const [items, setItems] = useState([]);

  let pageName = pathname.substring(1) || "blog";
  if (searchParams.search) pageName = searchParams.search;

  useEffect(() => {
    async function fetchData() {
      let items = [];

      if (pageName === "blog") {
        const postsData = await API.graphql({ query: queries.listPosts });
        items = postsData.data.listPosts.items.map((post) => ({
          ...post,
          type: "post",
        }));
      }

      if (pageName === "work") {
        const jobsData = await API.graphql({ query: queries.listJobs });
        items = jobsData.data.listJobs.items.map((job) => ({
          ...job,
          type: "job",
        }));
      }

      if (pageName === "projects") {
        const projectsData = await API.graphql({ query: queries.listProjects });
        items = projectsData.data.listProjects.items.map((project) => ({
          ...project,
          type: "project",
        }));
      }

      setItems(items);
    }
    fetchData();
  }, [pageName]);

  let sortedItems = items.sort(function (a, b) {
    if (a.end < b.end) {
      return 1;
    } else if (b.end < a.end) {
      return -1;
    } else {
      return 0;
    }
  });
  let education = sortedItems.filter((itm) => itm.tags.includes("education"));

  if (pageName === "projects") {
    sortedItems = sortedItems.sort(
      (a, b) =>
        statusOrder.indexOf(a.badgeText) - statusOrder.indexOf(b.badgeText)
    );
  }

  if (pageName === "work") {
    return (
      <div className="my-4">
        <Alert variant="info">
          Click{" "}
          <PDFDownloadLink
            document={<Resume items={sortedItems} education={education} />}
            fileName="Josh_Knapp_Resume.pdf"
          >
            <span className="alert-link">here</span>
          </PDFDownloadLink>{" "}
          for Josh's resume
        </Alert>
        <Timeline items={sortedItems} />
      </div>
    );
  } else if (pageName === "projects") {
    return (
      <div className="my-4">
        {sortedItems.map((item, i) => (
          <Project key={i} project={item} />
        ))}
      </div>
    );
  } else {
    return sortedItems.map((item, i) => <Post key={i} post={item} />);
  }
}
