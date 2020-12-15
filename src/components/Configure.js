import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  Dropdown,
  Form,
  FormControl,
  Table,
  Accordion,
  Card,
} from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import ImageUploader from "./ImageUploader";
import { API, graphqlOperation } from "aws-amplify";
import { createConfiguration, updateConfiguration } from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { useIsMounted } from "../lib/utils";
export default Configure;

const pageOptions = ["blog", "work", "projects"];

function Configure() {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [avatar, setAvatar] = useState("");
  const [favicon, setFavicon] = useState("");
  const [pages, setPages] = useState([]);
  const [edited, setEdited] = useState(false);
  const [resumeGeneratorEnabled, setResumeGeneratorEnabled] = useState(false);

  const isMounted = useIsMounted();

  async function handleSave() {
    let inpData = {
      name,
      tagline,
      avatar,
      pages,
      favicon,
      resumeGeneratorEnabled,
    };

    if (process.env.REACT_APP_CONFIGURATION_ID) {
      inpData.id = process.env.REACT_APP_CONFIGURATION_ID;

      await API.graphql(
        graphqlOperation(updateConfiguration, { input: inpData })
      );
    } else {
      await API.graphql(
        graphqlOperation(createConfiguration, { input: inpData })
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      const configData = await API.graphql({
        query: queries.getConfiguration,
        variables: { id: process.env.REACT_APP_CONFIGURATION_ID },
      });

      if (configData && isMounted.current) {
        setName(configData.data.getConfiguration.name);
        setTagline(configData.data.getConfiguration.tagline);
        setAvatar(configData.data.getConfiguration.avatar);
        setPages(configData.data.getConfiguration.pages);
        setFavicon(configData.data.getConfiguration.favicon);
        setResumeGeneratorEnabled(
          configData.data.getConfiguration.resumeGeneratorEnabled
        );
      }
    }
    if (process.env.REACT_APP_CONFIGURATION_ID) {
      fetchData();
    }
  }, [isMounted]);

  return (
    <div className="mt-4">
      <h4>Configure</h4>
      <Form.Label className="mb-0">Name</Form.Label>
      <FormControl
        id="name"
        className="mb-3"
        aria-describedby="name"
        value={name || ""}
        onChange={(e) => {
          setName(e.target.value);
          setEdited(true);
        }}
      />

      <Form.Label className="mb-0">Tagline</Form.Label>
      <FormControl
        id="tagline"
        className="mb-4"
        aria-describedby="tagline"
        value={tagline || ""}
        onChange={(e) => {
          setTagline(e.target.value);
          setEdited(true);
        }}
      />

      <hr />

      <ImageUploader
        images={avatar ? [avatar] : []}
        afterEdit={(imgs) => {
          if (imgs && imgs.length) {
            setAvatar(imgs[0]);
          } else {
            setAvatar("");
          }
          setEdited(true);
        }}
        fieldId="avatar"
        fieldLabel="Avatar (if your image is over 5mb, let me know, I have to add it manually)"
        imageLimit={1}
      />

      <ImageUploader
        images={favicon ? [favicon] : []}
        afterEdit={(imgs) => {
          if (imgs && imgs.length) {
            setFavicon(imgs[0]);
          } else {
            setFavicon("");
          }
          setEdited(true);
        }}
        fieldId="favicon"
        fieldLabel="Favicon"
        imageLimit={1}
      />

      <hr />

      <Form.Label className="mb-0">Pages</Form.Label>
      <Table bordered className="mb-3">
        <tbody>
          {pages.map((page, i) => (
            <tr key={i}>
              <td>
                {page} {i === 0 ? "(home)" : ""}
              </td>
              <td className="text-right" style={{ width: "100px" }}>
                {i !== 0 ? (
                  <AiOutlineArrowUp
                    className="cursor-pointer"
                    title="up"
                    onClick={() => {
                      const updPages = [...pages];
                      updPages.splice(i, 1);
                      updPages.splice(i - 1, 0, page);
                      setPages(updPages);
                      setEdited(true);
                    }}
                  />
                ) : null}
                {i !== pages.length - 1 ? (
                  <AiOutlineArrowDown
                    className="cursor-pointer"
                    title="down"
                    onClick={() => {
                      const updPages = [...pages];
                      updPages.splice(i, 1);
                      updPages.splice(i + 1, 0, page);
                      setPages(updPages);
                      setEdited(true);
                    }}
                  />
                ) : null}
                <FaTimes
                  color="#dc3545"
                  className="cursor-pointer ml-2"
                  title="delete page"
                  onClick={() => {
                    const updPages = [...pages];
                    updPages.splice(i, 1);
                    setPages(updPages);
                    setEdited(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {pages.length !== pageOptions.length ? (
        <Dropdown className="mt-2">
          <Dropdown.Toggle variant="link" size="sm" className="pl-0 pt-0">
            Add page
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {pageOptions.map((option, i) => (
              <Fragment key={i}>
                <Dropdown.Item
                  onClick={() => {
                    const updPages = [...pages, option];
                    setPages(updPages);
                    setEdited(true);
                  }}
                  disabled={pages.includes(option)}
                >
                  {option}
                </Dropdown.Item>
              </Fragment>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : null}

      <hr />

      <Accordion className="mt-3">
        <Card className="bg-transparent">
          <Card.Header className="p-0 bg-transparent border-bottom-0">
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              className="pl-0"
            >
              Advanced
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="bg-transparent px-0">
              <Form.Check
                type="checkbox"
                label="Enable resume generator"
                checked={resumeGeneratorEnabled}
                onChange={() => {
                  setResumeGeneratorEnabled(!resumeGeneratorEnabled);
                  setEdited(true);
                }}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      {edited ? (
        <Button className="mt-2" variant="primary" onClick={handleSave}>
          Save
        </Button>
      ) : null}
    </div>
  );
}
