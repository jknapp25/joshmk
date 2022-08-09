import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

import Tag from "./Tag";
import SearchPreview from "./SearchPreview";

export default Search;

function Search() {
  const { search } = useLocation();
  const searchParams = parse(search);
  const [items, setItems] = useState([]);

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

      const postsData = await API.graphql({ query: queries.listPosts });
      const posts = postsData.data.listPosts.items.map((post) => ({
        ...post,
        type: "post",
      }));
      items = [...items, ...posts];

      const prodItemsData = await API.graphql({ query: queries.listItems });
      const prodItems = prodItemsData.data.listItems.items.map((prodItem) => ({
        ...prodItem,
        type: "item",
      }));
      items = [...items, ...prodItems];

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

      const projectsData = await API.graphql({ query: queries.listProjects });
      const projects = projectsData.data.listProjects.items.map((project) => ({
        ...project,
        type: "project",
      }));
      items = [...items, ...projects];

      if (isMounted.current) setItems(items);
    }
    fetchData();
  }, [searchParams.tag]);

  if (items.length === 0) return null;

  let preppedItems = [];

  // sort items by date and filter
  preppedItems = items
    .sort((a, b) => {
      const aSortVal = a.createdAt;
      const bSortVal = b.createdAt;
      if (aSortVal < bSortVal) {
        return 1;
      } else if (bSortVal < aSortVal) {
        return -1;
      } else {
        return 0;
      }
    })
    .filter((item) => item.tags.includes(searchParams.tag));

  return (
    <>
      <div className="mb-5 text-center">
        <h1 className="mb-2 display-4 fw-bold">{searchParams.tag}</h1>
        <div className="mb-2 mt-1 small d-block">
          {preppedItems.length} item{preppedItems.length > 1 ? "s" : ""}
        </div>
      </div>

      {preppedItems.map((item, i) => (
        <SearchPreview
          key={`search-item-${i}`}
          type={item.type}
          thing={item}
          borderTop={i === 0}
        />
      ))}
    </>
  );
}
