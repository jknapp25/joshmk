import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Form, FormControl } from "react-bootstrap";
import { API } from "aws-amplify";
import TagEditor from "./TagEditor";
import * as queries from "../graphql/queries";
import { useIsMounted } from "../lib/utils";
export default JobEditor;

function JobEditor({ id = null, onCreate, onUpdate }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [activeDetail, setActiveDetail] = useState("");
  const [type, setType] = useState("full-time");
  const [details, setDetails] = useState([]);
  const [companyUrl, setCompanyUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [complexity, setComplexity] = useState(0);
  const [tagUsage, setTagUsage] = useState([]);

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const jobData = await API.graphql({
        query: queries.getJob,
        variables: { id },
      });

      if (jobData && isMounted.current) {
        setCompany(jobData.data.getJob.company);
        setCompanyUrl(jobData.data.getJob.companyUrl);
        setRole(jobData.data.getJob.role);
        setLocation(jobData.data.getJob.location);
        setType(jobData.data.getJob.type);
        setTags(jobData.data.getJob.tags);
        setDetails(jobData.data.getJob.details);
        setStart(jobData.data.getJob.start);
        setEnd(jobData.data.getJob.end);
        setActiveDetail("");
      }
    }
    if (id) {
      fetchData();
    }
  }, [id, isMounted]);

  function clearEditor() {
    setCompany("");
    setCompanyUrl("");
    setActiveDetail("");
    setDetails([]);
    setRole("");
    setType("");
    setLocation("");
    setSummary("");
    setTags([]);
    setStart("");
    setEnd("");
    setComplexity(0);
    setTagUsage([]);
  }

  function handleButtonClick() {
    const data = {
      company,
      role,
      location,
      summary,
      type,
      details,
      companyUrl,
      tags,
      start,
      end,
      complexity,
      tagUsage,
    };

    if (id) {
      data.id = id;
      onUpdate("job", data);
    } else {
      onCreate("job", data);
    }

    if (isMounted.current) clearEditor();
  }

  return (
    <>
      <Form.Label className="mb-0">Role</Form.Label>
      <FormControl
        id="role"
        className="mb-2"
        aria-describedby="role"
        value={role || ""}
        onChange={(e) => setRole(e.target.value)}
      />

      <Form.Label className="mb-0">Company</Form.Label>
      <FormControl
        id="company"
        className="mb-2"
        aria-describedby="company"
        value={company || ""}
        onChange={(e) => setCompany(e.target.value)}
      />

      <Form.Label className="mb-0">Company Website URL</Form.Label>
      <FormControl
        id="companyUrl"
        className="mb-2"
        aria-describedby="companyUrl"
        value={companyUrl || ""}
        onChange={(e) => setCompanyUrl(e.target.value)}
      />

      <Form.Label className="mb-0">Summary</Form.Label>
      <FormControl
        id="summary"
        as="textarea"
        rows="2"
        className="mb-2"
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

      <Form.Label className="mb-0">Location</Form.Label>
      <FormControl
        id="location"
        className="mb-2"
        aria-describedby="location"
        value={location || ""}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Form.Label className="mb-0">Type</Form.Label>
      <ButtonGroup className="mb-2 d-block">
        {["full-time", "contract"].map((jobType) => (
          <Button
            variant={jobType === type ? "primary" : "secondary"}
            onClick={() => {
              setType(jobType);
            }}
          >
            {jobType}
          </Button>
        ))}
      </ButtonGroup>

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
        {id ? "Update" : "Create"}
      </Button>
    </>
  );
}
