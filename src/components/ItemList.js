import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import { API } from "aws-amplify";
import { Button } from "react-bootstrap";
import * as queries from "../graphql/queries";

import Tag from "./Tag";
import Post from "./Post";
import Project from "./Project";
import Job from "./Job";
import Education from "./Education";
import PostPreview from "./PostPreview";
import ItemPreview from "./ItemPreview";

export default ItemList;

function ItemList({ mini = false }) {
  const { pathname, search } = useLocation();
  const searchParams = parse(search);
  const [items, setItems] = useState([]);
  const [renderedItems, setRenderedItems] = useState(2);
  const [displayMore, setDisplayMore] = useState(null);

  let pageName = pathname.substring(1) || "blog";

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (displayMore) {
      setRenderedItems(renderedItems + 3);
      setDisplayMore(false);
    }
  }, [displayMore, renderedItems, setDisplayMore]);

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

      if (pageName === "search") {
        const prodItemsData = await API.graphql({ query: queries.listItems });
        const prodItems = prodItemsData.data.listItems.items.map(
          (prodItem) => ({
            ...prodItem,
            type: "item",
          })
        );
        items = [...items, ...prodItems];
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
  }, [pageName, searchParams.tag]);

  if (items.length === 0) return null;

  let preppedItems = [];
  let education = [];

  // sort items by date
  preppedItems = items.sort((a, b) => {
    const aSortVal =
      pageName === "blog" || pageName === "search" ? a.createdAt : a.start;
    const bSortVal =
      pageName === "blog" || pageName === "search" ? b.createdAt : b.start;
    if (aSortVal < bSortVal) {
      return 1;
    } else if (bSortVal < aSortVal) {
      return -1;
    } else {
      return 0;
    }
  });

  if (pageName === "work") {
    education = preppedItems.filter((itm) => itm.tags.includes("education"));
  } else if (pageName === "search") {
    preppedItems = preppedItems.filter((item) =>
      item.tags.includes(searchParams.tag)
    );
  }

  preppedItems = preppedItems.filter((itm) => !itm.hidden);

  console.log("renderedItems: ", renderedItems);

  return (
    <>
      {pageName === "search" ? (
        <div className="mb-5 d-flex align-items-center">
          <Tag tag={searchParams.tag} size="lg" />
          <div className="mb-2 mt-1 small d-inline">
            {preppedItems.length} item{preppedItems.length > 1 ? "s" : ""}
          </div>
        </div>
      ) : null}

      {pageName === "blog"
        ? preppedItems.map((item, i) =>
            i <= renderedItems ? (
              <div key={i}>
                {item.type === "post" && mini ? (
                  <PostPreview post={item} />
                ) : null}
                {item.type === "post" && !mini ? (
                  <Post
                    post={item}
                    bottomBorder={i < renderedItems}
                  />
                ) : null}
                {item.type === "item" ? <ItemPreview item={item} /> : null}
                {item.type === "job" ? <Job job={item} /> : null}
                {item.type === "project" ? <Project project={item} /> : null}
                {item.type === "education" && !pageName === "work" ? (
                  <Education education={item} />
                ) : null}
                {!mini && i !== preppedItems.length - 1 ? (
                  <div style={{ height: "35px" }} />
                ) : null}
              </div>
            ) : null
          )
        : preppedItems.map((item, i) => (
            <div key={i}>
              {item.type === "post" && mini ? (
                <PostPreview
                  post={item}
                  borderTop={i === 0 && pageName === "search"}
                />
              ) : null}
              {item.type === "post" && !mini ? <Post post={item} /> : null}
              {item.type === "item" ? <ItemPreview item={item} /> : null}
              {item.type === "job" ? <Job job={item} /> : null}
              {item.type === "project" ? <Project project={item} /> : null}
              {item.type === "education" && !pageName === "work" ? (
                <Education education={item} />
              ) : null}
              {!mini && i !== preppedItems.length - 1 ? (
                <div style={{ height: "35px" }} />
              ) : null}
            </div>
          ))}

      {pageName === "blog" && preppedItems?.length > 3 ? (
        <div className="d-grid">
          <Button variant="dark" size="lg" onClick={() => setDisplayMore(true)}>
            Load older posts
          </Button>
        </div>
      ) : null}
    </>
  );
}
