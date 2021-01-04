import React, { useState, useEffect, useRef, useContext } from "react";
import { Alert } from "react-bootstrap";
import Resume from "./Resume";
import { useLocation, navigate } from "@reach/router";
import { parse } from "query-string";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import Post from "./Post";
import Project from "./Project";
import Job from "./Job";
import Education from "./Education";
import { FaTimes } from "react-icons/fa";
import { ConfigContext } from "../App";
export default ItemList;

const statusOrder = ["active", "on hold", "completed"];

function ItemList() {
  const { pathname, search } = useLocation();
  const config = useContext(ConfigContext);
  const searchParams = parse(search);
  const [items, setItems] = useState([]);

  let pageName = pathname.substring(1) || "blog";

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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

        const educationData = await API.graphql({
          query: queries.listEducations,
        });
        const educations = educationData.data.listEducations.items.map(
          (education) => ({
            ...education,
            type: "education",
          })
        );
        items = [...items, ...jobs, ...educations];
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

      if (isMounted.current) setItems(items);
    }
    fetchData();
  }, [pageName]);

  if (items.length === 0) return null;

  let preppedItems = [];
  let education = [];
  if (pageName === "work") {
    preppedItems = items.sort(function (a, b) {
      if (a.start < b.start) {
        return 1;
      } else if (b.start < a.start) {
        return -1;
      } else {
        return 0;
      }
    });
    education = preppedItems.filter((itm) => itm.tags.includes("education"));
  } else if (pageName === "projects") {
    preppedItems = items.sort(
      (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
    );
  } else if (pageName === "search") {
    preppedItems = items.filter((item) => item.tags.includes(searchParams.tag));
  } else {
    preppedItems = items.sort(function (a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (b.createdAt < a.createdAt) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  return (
    <>
      {pageName === "work" && config?.resumeGeneratorEnabled ? (
        <Alert variant="light">
          Click{" "}
          <PDFDownloadLink
            document={<Resume items={preppedItems} education={education} />}
            fileName={`${config.fullName.replace(" ", "_")}_Resume.pdf`}
          >
            <a className="alert-link" href="#">
              here
            </a>
          </PDFDownloadLink>{" "}
          for {config.nickName}'s resume
        </Alert>
      ) : null}
      {pageName === "search" ? (
        <h3 className="mb-4 mt-1">
          {preppedItems.length} item{preppedItems.length > 1 ? "s" : ""} tagged{" "}
          {searchParams.tag}
          <span
            className="text-muted ml-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaTimes color="#dc3545" title="clear search" />
          </span>
        </h3>
      ) : null}
      {preppedItems.map((item, i) => (
        <>
          {item.type === "post" ? <Post key={i} post={item} /> : null}
          {item.type === "job" ? <Job key={i} job={item} /> : null}
          {item.type === "project" ? <Project key={i} project={item} /> : null}
          {item.type === "education" ? (
            <Education key={i} education={item} />
          ) : null}
          {i !== preppedItems.length - 1 ? <div className="my-4" /> : null}
        </>
      ))}
    </>
  );
}
