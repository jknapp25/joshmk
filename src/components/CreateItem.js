import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import SideNavNew from "./SideNavNew";
import { GoPencil } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import PostEditor from "./PostEditor";
import JobEditor from "./JobEditor";
import ProjectEditor from "./ProjectEditor";
import EducationEditor from "./EducationEditor";
import GalleryEditor from "./GalleryEditor";
import { API, graphqlOperation } from "aws-amplify";
import {
  createPost,
  createJob,
  createProject,
  createEducation,
  deletePost,
  updatePost,
  updateJob,
  updateProject,
  updateEducation,
  updateConfiguration,
} from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { useIsMounted } from "../lib/utils";
export default withAuthenticator(CreateItem);

function CreateItem({ pages }) {
  const [items, setItems] = useState([]);
  const [itemType, setItemType] = useState("post");
  const [editingItemId, setEditingItemId] = useState("");

  const isMounted = useIsMounted();

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
    if (type === "gallery") {
      await API.graphql(graphqlOperation(updateConfiguration, { input: data }));
    }
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

      if (isMounted.current) setItems(fetchedItems);
    }
    fetchData();
  }, [isMounted]);

  async function deletePst(postId) {
    if (postId) {
      await API.graphql(
        graphqlOperation(deletePost, { input: { id: postId } })
      );
    }
  }

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
    <Container fluid>
      <Row>
        <Col lg={3}>
          <SideNavNew />
        </Col>
        <Col lg={6}>
          <div className="mb-4">
            <AmplifySignOut />
          </div>

          <div className="my-4">
            {["post", "job", "project", "education", "gallery"].map((type) => (
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
                {type === "gallery" ? "Add images to gallery" : null}
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
          {itemType === "gallery" ? (
            <GalleryEditor onUpdate={handleUpdate} />
          ) : null}
        </Col>
        <Col lg={3}></Col>
      </Row>
      <div className="mb-5" />
      <Row>
        <Col lg={2}></Col>
        <Col lg={8}>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.length > 0 ? (
                sortedItems.map((item, i) => {
                  if (item.type === "post")
                    return (
                      <tr key={i}>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>
                          {item.createdAt
                            ? moment(item.createdAt).format("MMMM D, Y")
                            : null}
                        </td>
                        <td>
                          <span
                            className="me-2"
                            onClick={() => {
                              setItemType("post");
                              setEditingItemId(item.id);
                              window.scrollTo(0, 0);
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
                            onClick={() => {
                              const shouldDelete =
                                window.confirm("Delete the item?");
                              if (shouldDelete) {
                                deletePst(item.id);
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
                      // <Post
                      //   key={i}
                      //   post={item}
                      //   setEditingItemId={setEditingItemId}
                      //   setItemType={setItemType}
                      //   showEdit={true}
                      // />
                    );
                  return null;
                })
              ) : (
                <div>No items</div>
              )}
            </tbody>
          </Table>
        </Col>
        <Col lg={2}></Col>
      </Row>
      {/* {sortedItems.length > 0 ? (
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
      )} */}
    </Container>
  );
}
