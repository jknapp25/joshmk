import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Post from "./Post";
import Job from "./Job";
import Project from "./Project";
import Education from "./Education";
import PostEditor from "./PostEditor";
import JobEditor from "./JobEditor";
import ProjectEditor from "./ProjectEditor";
import EducationEditor from "./EducationEditor";
import { API, graphqlOperation } from "aws-amplify";
import {
  createPost,
  createJob,
  createProject,
  createEducation,
  updatePost,
  updateJob,
  updateProject,
  updateEducation,
} from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
export default withAuthenticator(CreateItem);

function CreateItem() {
  const [items, setItems] = useState([]);
  const [itemType, setItemType] = useState("post");
  const [editingItemId, setEditingItemId] = useState("");

  async function handleCreate(type, data) {
    if (type === "post")
      await API.graphql(graphqlOperation(createPost, { input: data }));
    if (type === "job")
      await API.graphql(graphqlOperation(createJob, { input: data }));
    if (type === "project")
      await API.graphql(graphqlOperation(createProject, { input: data }));
    if (type === "education")
      await API.graphql(graphqlOperation(createEducation, { input: data }));
  }

  async function handleUpdate(type, data) {
    if (type === "post")
      await API.graphql(graphqlOperation(updatePost, { input: data }));
    if (type === "job")
      await API.graphql(graphqlOperation(updateJob, { input: data }));
    if (type === "project")
      await API.graphql(graphqlOperation(updateProject, { input: data }));
    if (type === "education")
      await API.graphql(graphqlOperation(updateEducation, { input: data }));
  }

  useEffect(() => {
    async function fetchData() {
      const postsData = await API.graphql({ query: queries.listPosts });
      const posts = postsData.data.listPosts.items.map((post) => ({
        ...post,
        type: "post",
      }));

      const jobsData = await API.graphql({ query: queries.listJobs });
      const jobs = jobsData.data.listJobs.items.map((job) => ({
        ...job,
        type: "job",
      }));

      const projectsData = await API.graphql({ query: queries.listProjects });
      const projects = projectsData.data.listProjects.items.map((project) => ({
        ...project,
        type: "project",
      }));

      const educationsData = await API.graphql({
        query: queries.listEducations,
      });
      const educations = educationsData.data.listEducations.items.map(
        (education) => ({
          ...education,
          type: "education",
        })
      );

      const fetchedItems = [...posts, ...jobs, ...projects, ...educations];

      setItems(fetchedItems);
    }
    fetchData();
  }, []);

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
      <div className="my-4">
        <AmplifySignOut />
      </div>

      <div className="my-4">
        {["post", "job", "project", "education"].map((type) => (
          <Button
            key={type}
            variant={type === itemType ? "primary" : "secondary"}
            className="mr-2 mb-2"
            size="lg"
            onClick={() => setItemType(type)}
          >
            {type === "post" ? "Write a post" : null}
            {type === "job" ? "Add work experience" : null}
            {type === "project" ? "Start a project" : null}
            {type === "education" ? "Add education" : null}
          </Button>
        ))}
      </div>

      {itemType === "post" ? (
        <PostEditor
          id={editingItemId}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      ) : null}
      {itemType === "job" ? (
        <JobEditor
          id={editingItemId}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      ) : null}
      {itemType === "project" ? (
        <ProjectEditor
          id={editingItemId}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      ) : null}
      {itemType === "education" ? (
        <EducationEditor
          id={editingItemId}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      ) : null}
      <div className="mb-5" />
      {sortedItems.length > 0 ? (
        sortedItems.map((item, i) => {
          if (item.type === "post")
            return (
              <Post
                key={i}
                post={item}
                setEditingItemId={setEditingItemId}
                setItemType={setItemType}
                showEdit={true}
              />
            );
          if (item.type === "job")
            return (
              <Job
                key={i}
                job={item}
                setEditingItemId={setEditingItemId}
                setItemType={setItemType}
                showEdit={true}
              />
            );
          if (item.type === "project")
            return (
              <Project
                key={i}
                project={item}
                setEditingItemId={setEditingItemId}
                setItemType={setItemType}
                showEdit={true}
              />
            );
          if (item.type === "education")
            return (
              <Education
                key={i}
                education={item}
                setEditingItemId={setEditingItemId}
                setItemType={setItemType}
                showEdit={true}
              />
            );
          return null;
        })
      ) : (
        <div>No items</div>
      )}
    </>
  );
}
