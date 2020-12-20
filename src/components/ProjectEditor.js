import React, { useState, useEffect } from "react";
import { Button, Dropdown, Form, FormControl } from "react-bootstrap";
import ImageUploader from "./ImageUploader";
import TagEditor from "./TagEditor";
import { statusColorLookup } from "../lib/utils";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
export default ProjectEditor;

function ProjectEditor({ id = null, onCreate, onUpdate }) {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [activeTask, setActiveTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("active");
  const [tags, setTags] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [complexity, setComplexity] = useState(0);
  const [tagUsage, setTagUsage] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const projectData = await API.graphql({
        query: queries.getProject,
        variables: { id },
      });

      if (projectData) {
        setName(projectData.data.getProject.name);
        setSummary(projectData.data.getProject.summary);
        setTags(projectData.data.getProject.tags);
        setImages(projectData.data.getProject.images);
        setTasks(projectData.data.getProject.tasks);
        setLink(projectData.data.getProject.link);
        setStatus(projectData.data.getProject.status);
        setStart(projectData.data.getProject.start);
        setEnd(projectData.data.getProject.end);
      }
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  function clearEditor() {
    setName("");
    setSummary("");
    setTasks([]);
    setLink("");
    setStatus("active");
    setTags([]);
    setStart("");
    setEnd("");
    setComplexity(0);
    setTagUsage([]);
    setImages([]);
  }

  function handleButtonClick() {
    const data = {
      name,
      summary,
      tasks,
      link,
      status,
      tags,
      start,
      end,
      complexity,
      tagUsage,
      images,
    };

    if (id) {
      data.id = id;
      onUpdate("project", data);
    } else {
      onCreate("project", data);
    }

    clearEditor();
  }

  return (
    <>
      <Form.Label className="mb-0">Name</Form.Label>
      <FormControl
        id="name"
        className="mb-2"
        aria-describedby="name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />

      <Form.Label className="mb-0">Summary</Form.Label>
      <FormControl
        id="summary"
        className="mb-2"
        as="textarea"
        rows="2"
        aria-describedby="summary"
        value={summary || ""}
        onChange={(e) => setSummary(e.target.value)}
      />

      <Form.Label className="mb-0">Tasks</Form.Label>
      <FormControl
        id="activeTask"
        aria-describedby="activeTask"
        value={activeTask || ""}
        onChange={(e) => setActiveTask(e.target.value)}
      />
      <Button
        variant="link"
        size="sm"
        className="mt-2 mb-1 pl-0 pt-0"
        onClick={() => {
          setTasks([...tasks, activeTask]);
          setActiveTask("");
        }}
      >
        Add
      </Button>
      <ul>
        {tasks.map((task) => (
          <li>{task}</li>
        ))}
      </ul>

      <Form.Label className="mb-0">Status</Form.Label>
      <Dropdown>
        <Dropdown.Toggle
          className="mb-2"
          variant={statusColorLookup[status] || "secondary"}
        >
          {status || "Select"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(statusColorLookup).map((statusName) => (
            <Dropdown.Item
              variant={statusColorLookup[statusName]}
              onClick={() => setStatus(statusName)}
            >
              {statusName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Form.Label className="mb-0">Link</Form.Label>
      <FormControl
        id="link"
        className="mb-2"
        aria-describedby="link"
        value={link || ""}
        onChange={(e) => setLink(e.target.value)}
      />

      <TagEditor tags={tags} onChange={(updTags) => setTags(updTags)} />

      <ImageUploader
        images={images || []}
        afterEdit={(imgs) => {
          setImages(imgs);
        }}
        fieldId="images"
        fieldLabel="Images"
        fileSizeLimit={5}
      />

      <Form.Label className="mb-0">Start (ex: 2020-10-14)</Form.Label>
      <FormControl
        id="start"
        className="mb-2"
        aria-describedby="start"
        value={start || ""}
        onChange={(e) => setStart(e.target.value)}
      />

      <Form.Label className="mb-0">End (ex: 2020-10-14)</Form.Label>
      <FormControl
        id="end"
        className="mb-2"
        aria-describedby="end"
        value={end || ""}
        onChange={(e) => setEnd(e.target.value)}
      />

      <Button className="mt-2" onClick={handleButtonClick}>
        {id ? "Update" : "Create"}
      </Button>
    </>
  );
}
