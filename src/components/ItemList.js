import React, { useState, useEffect } from "react";
import { Alert, Badge } from "react-bootstrap";
import Timeline from "./Timeline";
import Resume from "./Resume";
import { useLocation, navigate } from "@reach/router";
import { parse } from "query-string";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import Post from "./Post";
import Project from "./Project";
import Job from "./Job";
export default ItemList;

const statusOrder = ["Active", "On Hold", "Complete"];

function ItemList() {
  const { pathname, search } = useLocation();
  const searchParams = parse(search);
  const [items, setItems] = useState([]);

  let pageName = pathname.substring(1) || "blog";

  useEffect(() => {
    setItems([]);

    async function fetchData() {
      let items = [];

      if (pageName === "blog" || pageName === "search") {
        const postsData = await API.graphql({ query: queries.listPosts });
        const posts = postsData.data.listPosts.items.map((post) => ({
          ...post,
          type: "post",
        }));
        items = [...items, ...posts];
      }

      if (pageName === "work" || pageName === "search") {
        const jobsData = await API.graphql({ query: queries.listJobs });
        const jobs = jobsData.data.listJobs.items.map((job) => ({
          ...job,
          type: "job",
        }));
        items = [...items, ...jobs];
      }

      if (pageName === "projects" || pageName === "search") {
        const projectsData = await API.graphql({ query: queries.listProjects });
        const projects = projectsData.data.listProjects.items.map(
          (project) => ({
            ...project,
            type: "project",
          })
        );
        items = [...items, ...projects];
      }

      setItems(items);
    }
    fetchData();
  }, [pageName]);

  let sortedItems = items.sort(function (a, b) {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else if (b.createdAt < a.createdAt) {
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
  } else if (pageName === "search") {
    const filteredItems = sortedItems.filter((item) =>
      item.tags.includes(searchParams.tag)
    );
    return (
      <div className="my-4">
        <h3 className="mb-4 mt-4">
          {filteredItems.length} items tagged
          <Badge pill variant="transparent" className="ml-2 active">
            {searchParams.tag}
          </Badge>{" "}
          |
          <span
            className="text-muted ml-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            clear search
          </span>
        </h3>
        {filteredItems.map((item, i) => {
          if (item.type === "post")
            return (
              <Post
                key={i}
                setEditingItemId={() => {}}
                post={item}
                showEdit={false}
              />
            );
          if (item.type === "job") return <Job key={i} job={item} />;
          if (item.type === "project")
            return <Project key={i} project={item} />;
          return null;
        })}
      </div>
    );
  } else {
    return sortedItems.map((item, i) => <Post key={i} post={item} />);
  }
}
