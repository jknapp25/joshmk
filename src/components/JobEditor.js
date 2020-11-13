import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
export default JobEditor;

function JobEditor({ onCreate }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [activeDetail, setActiveDetail] = useState('');
  const [details, setDetails] = useState([]);
  const [companyUrl, setCompanyUrl] = useState('');
  const [tags, setTags] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [complexity, setComplexity] = useState(0);
  const [tagUsage, setTagUsage] = useState([]);

  function handleButtonClick() {
    const updTags = tags.split(' ');
    const data = {
      company,
      role,
      location,
      summary,
      details,
      companyUrl,
      tags: updTags,
      start,
      end,
      complexity,
      tagUsage
    }

    onCreate('job', data)
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
      <Button variant="link" size="sm" className="mt-2 mb-1 pl-0 pt-0" onClick={() => {
        setDetails([...details, activeDetail]);
        setActiveDetail('');
      }}>
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

      <Form.Label className="mb-0">Tags (ex: blog cheese monkey)</Form.Label>
      <FormControl
        id="tags"
        className="mb-2"
        aria-describedby="tags"
        value={tags || ""}
        onChange={(e) => setTags(e.target.value)}
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
        Create
      </Button>
    </>
  );
}
