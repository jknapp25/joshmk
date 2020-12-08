import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  Dropdown,
  Form,
  FormControl,
  Image,
  Table,
} from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { createConfiguration, updateConfiguration } from "../graphql/mutations";
import * as queries from "../graphql/queries";
export default Configure;

const pageOptions = ["blog", "work", "projects"];

function Configure() {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [avatar, setAvatar] = useState("");
  const [favicon, setFavicon] = useState("");
  const [pages, setPages] = useState([]);
  const [edited, setEdited] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");

  async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    const { key } = await Storage.put(file.name, file, {
      contentType: file.type,
    });
    if (key) {
      setAvatar(key);
      setEdited(true);
    }
  }

  async function handleFaviconUpload(e) {
    const file = e.target.files[0];
    const { key } = await Storage.put(file.name, file, {
      contentType: file.type,
    });
    if (key) {
      setFavicon(key);
      setEdited(true);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const avatarUrl = await Storage.get(avatar);
      setAvatarUrl(avatarUrl);
    }
    if (avatar) {
      fetchData();
    }
  }, [avatar]);

  useEffect(() => {
    async function fetchData() {
      const faviconUrl = await Storage.get(favicon);
      setFaviconUrl(faviconUrl);
    }
    if (favicon) {
      fetchData();
    }
  }, [favicon]);

  async function handleSave() {
    let inpData = {
      name,
      tagline,
      avatar,
      pages,
      favicon,
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

      // setId(data.data.createConfiguration.id);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const configData = await API.graphql({
        query: queries.getConfiguration,
        variables: { id: process.env.REACT_APP_CONFIGURATION_ID },
      });
      setName(configData.data.getConfiguration.name);
      setTagline(configData.data.getConfiguration.tagline);
      setAvatar(configData.data.getConfiguration.avatar);
      setPages(configData.data.getConfiguration.pages);
      setFavicon(configData.data.getConfiguration.favicon);
    }
    if (process.env.REACT_APP_CONFIGURATION_ID) {
      fetchData();
    }
  }, []);

  return (
    <div className="mt-4">
      <h4>Configure</h4>
      <Form.Label className="mb-0">Name</Form.Label>
      <FormControl
        id="name"
        className="mb-2"
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
        className="mb-2"
        aria-describedby="tagline"
        value={tagline || ""}
        onChange={(e) => {
          setTagline(e.target.value);
          setEdited(true);
        }}
      />

      <Form.File
        id="avatar"
        className="mb-2"
        label="Avatar (if your image is over 5mb, let me know, I have to add it manually)"
        onChange={handleAvatarUpload}
      />
      <div className="mb-2">
        {avatarUrl ? (
          <>
            <Image src={avatarUrl} width="100" height="auto" thumbnail />
            <FaTimes
              color="#dc3545"
              title="delete image"
              className="cursor-pointer"
              onClick={() => {
                setAvatar("");
                setEdited(true);
              }}
            />
          </>
        ) : null}
      </div>

      <Form.File
        id="favicon"
        className="mb-2"
        label="Favicon"
        onChange={handleFaviconUpload}
      />
      <div className="mb-2">
        {faviconUrl ? (
          <>
            <Image src={faviconUrl} width="100" height="auto" thumbnail />
            <FaTimes
              color="#dc3545"
              title="delete image"
              className="cursor-pointer"
              onClick={() => {
                setFavicon("");
                setEdited(true);
              }}
            />
          </>
        ) : null}
      </div>

      <Form.Label className="mb-0">Pages</Form.Label>
      <Table bordered className="mb-1">
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
      {edited ? (
        <Button className="mt-2" variant="primary" onClick={handleSave}>
          Save
        </Button>
      ) : null}
    </div>
  );
}
