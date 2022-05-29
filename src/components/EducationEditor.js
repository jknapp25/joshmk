import React, { useState, useEffect } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate, useParams } from "react-router-dom";

import TagEditor from "./TagEditor";
import { createEducation, updateEducation } from "../graphql/mutations";
import * as queries from "../graphql/queries";
import useIsMounted from "../lib/useIsMounted";

export default EducationEditor;

function EducationEditor() {
  const [organization, setOrganization] = useState("");
  const [degree, setDegree] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState([]);
  const [organizationUrl, setOrganizationUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [activeDetail, setActiveDetail] = useState("");

  const isMounted = useIsMounted();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const educationData = await API.graphql({
        query: queries.getEducation,
        variables: { id: params.id },
      });

      if (educationData && isMounted.current) {
        setOrganization(educationData.data.getEducation.organization);
        setDegree(educationData.data.getEducation.degree);
        setTags(educationData.data.getEducation.tags);
        setLocation(educationData.data.getEducation.location);
        setSummary(educationData.data.getEducation.summary);
        setDetails(educationData.data.getEducation.details);
        setOrganizationUrl(educationData.data.getEducation.organizationUrl);
        setStart(educationData.data.getEducation.start);
        setEnd(educationData.data.getEducation.end);
      }
    }
    if (params.id) {
      fetchData();
    }
  }, [params.id, isMounted]);

  function clearEditor() {
    setOrganization("");
    setDegree("");
    setTags([]);
    setLocation("");
    setSummary("");
    setDetails([]);
    setOrganizationUrl("");
    setStart("");
    setEnd("");
  }

  function handleButtonClick() {
    const data = {
      organization,
      degree,
      location,
      summary,
      details,
      organizationUrl,
      start,
      end,
      tags,
    };

    if (params.id) {
      data.id = params.id;
      handleUpdate(data);
    } else {
      handleCreate(data);
    }

    if (isMounted.current) clearEditor();
  }

  async function handleCreate(data) {
    await API.graphql(graphqlOperation(createEducation, { input: data }));
    navigate("/create");
  }

  async function handleUpdate(data) {
    await API.graphql(graphqlOperation(updateEducation, { input: data }));
    navigate("/create");
  }

  return (
    <>
      <Form.Label className="mb-0">Organization</Form.Label>
      <FormControl
        id="organization"
        className="mb-2"
        aria-describedby="title"
        value={organization || ""}
        onChange={(e) => setOrganization(e.target.value)}
      />

      <Form.Label className="mb-0">Organization Website URL</Form.Label>
      <FormControl
        id="organizationUrl"
        className="mb-2"
        aria-describedby="organizationUrl"
        value={organizationUrl || ""}
        onChange={(e) => setOrganizationUrl(e.target.value)}
      />

      <Form.Label className="mb-0">Degree</Form.Label>
      <FormControl
        id="degree"
        className="mb-2"
        aria-describedby="degree"
        value={degree || ""}
        onChange={(e) => setDegree(e.target.value)}
      />

      <Form.Label className="mb-0">Location</Form.Label>
      <FormControl
        id="location"
        className="mb-2"
        aria-describedby="location"
        value={location || ""}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Form.Label className="mb-0">Summary</Form.Label>
      <FormControl
        id="summary"
        className="mb-2"
        as="textarea"
        rows="3"
        aria-describedby="summary"
        value={summary || ""}
        onChange={(e) => setSummary(e.target.value)}
      />

      <Form.Label className="mb-0">Details</Form.Label>
      <FormControl
        id="activeDetail"
        as="textarea"
        rows="2"
        aria-describedby="activeDetail"
        value={activeDetail || ""}
        onChange={(e) => setActiveDetail(e.target.value)}
      />
      <Button
        variant="link"
        size="sm"
        className="mt-2 mb-1 pl-0 pt-0"
        onClick={() => {
          setDetails([...details, activeDetail]);
          setActiveDetail("");
        }}
      >
        Add
      </Button>
      <ul>
        {details.map((detail) => (
          <li>{detail}</li>
        ))}
      </ul>

      <TagEditor tags={tags} onChange={(updTags) => setTags(updTags)} />

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
        {params.id ? "Update" : "Create"}
      </Button>
    </>
  );
}
