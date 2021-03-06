import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  Dropdown,
  Form,
  FormControl,
  Table,
  Accordion,
  Card,
  FormFile,
  Row,
  Col,
} from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import { API, graphqlOperation } from "aws-amplify";
import { createConfiguration, updateConfiguration } from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { useIsMounted } from "../lib/utils";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
export default withAuthenticator(Configure);

const pageOptions = ["blog", "work", "projects", "gallery", "about", "other"];

const blankEditorValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

function Configure() {
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [tagline, setTagline] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [supportUrl, setSupportUrl] = useState("");
  const [bio, setBio] = useState(blankEditorValue);
  const [avatar, setAvatar] = useState("");
  const [favicon, setFavicon] = useState("");
  const [pages, setPages] = useState([]);
  const [pagesCustom, setPagesCustom] = useState([]);
  const [edited, setEdited] = useState(false);
  const [resumeGeneratorEnabled, setResumeGeneratorEnabled] = useState(false);

  const isMounted = useIsMounted();

  const configIdName = window.location.href.includes("joshmk")
    ? "REACT_APP_JOSHMK_CONFIGURATION_ID"
    : "REACT_APP_CONFIGURATION_ID";

  async function handleSave() {
    let inpData = {
      fullName,
      nickName,
      emailAddress,
      tagline,
      bio: JSON.stringify(bio),
      instagramUrl,
      youtubeUrl,
      supportUrl,
      avatar,
      pages,
      pagesCustom,
      favicon,
      resumeGeneratorEnabled,
    };

    if (process.env[configIdName]) {
      inpData.id = process.env[configIdName];

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
        variables: { id: process.env[configIdName] },
      });

      if (configData && isMounted.current) {
        setFullName(configData.data.getConfiguration.fullName);
        setNickName(configData.data.getConfiguration.nickName);
        setEmailAddress(configData.data.getConfiguration.emailAddress);
        setTagline(configData.data.getConfiguration.tagline);
        if (configData.data.getConfiguration.bio) {
          const richContentResponse = JSON.parse(
            configData.data.getConfiguration.bio
          );
          setBio(richContentResponse);
        }
        setAvatar(configData.data.getConfiguration.avatar);
        setInstagramUrl(configData.data.getConfiguration.instagramUrl);
        setYoutubeUrl(configData.data.getConfiguration.youtubeUrl);
        setSupportUrl(configData.data.getConfiguration.supportUrl);
        setPages(configData.data.getConfiguration.pages);
        setPagesCustom(configData.data.getConfiguration.pagesCustom);
        setFavicon(configData.data.getConfiguration.favicon);
        setResumeGeneratorEnabled(
          configData.data.getConfiguration.resumeGeneratorEnabled
        );
      }
    }
    if (process.env[configIdName]) {
      fetchData();
    }
  }, [isMounted, configIdName]);

  console.log(pagesCustom);

  return (
    <Row>
      <Col lg={3}></Col>
      <Col lg={6}>
        <div className="mb-4">
          <AmplifySignOut />
        </div>

        <h4 className="mb-3">Configure</h4>
        <Form.Label className="mb-1">Full Name</Form.Label>
        <FormControl
          id="fullName"
          className="mb-3"
          aria-describedby="fullName"
          value={fullName || ""}
          onChange={(e) => {
            setFullName(e.target.value);
            setEdited(true);
          }}
        />

        <Form.Label className="mb-1">Nickname</Form.Label>
        <FormControl
          id="nickName"
          className="mb-3"
          aria-describedby="nickName"
          value={nickName || ""}
          onChange={(e) => {
            setNickName(e.target.value);
            setEdited(true);
          }}
        />

        <Form.Label className="mb-1">Email Address</Form.Label>
        <FormControl
          id="emailAddress"
          className="mb-3"
          aria-describedby="emailAddress"
          value={emailAddress || ""}
          onChange={(e) => {
            setEmailAddress(e.target.value);
            setEdited(true);
          }}
        />

        <Form.Label className="mb-1">Tagline</Form.Label>
        <FormControl
          id="tagline"
          className="mb-3"
          aria-describedby="tagline"
          value={tagline || ""}
          onChange={(e) => {
            setTagline(e.target.value);
            setEdited(true);
          }}
        />

        <Form.Label className="mb-1">Bio</Form.Label>
        <RichTextEditor
          value={bio}
          onChange={(updBio) => {
            setBio(updBio);
            setEdited(true);
          }}
          buttons={[
            "bold",
            "italic",
            "underline",
            "code",
            "strikethrough",
            "heading-one",
            "heading-two",
            "block-quote",
            "numbered-list",
            "bulleted-list",
            "link",
            "video",
          ]}
          classes="mb-3 bg-white"
        />

        <Form.Label className="mb-1">Instagram URL</Form.Label>
        <FormControl
          id="instagramUrl"
          className="mb-3"
          aria-describedby="instagramUrl"
          value={instagramUrl || ""}
          onChange={(e) => {
            setInstagramUrl(e.target.value);
            setEdited(true);
          }}
        />

        <Form.Label className="mb-1">YouTube URL</Form.Label>
        <FormControl
          id="youtubeUrl"
          className="mb-3"
          aria-describedby="youtubeUrl"
          value={youtubeUrl || ""}
          onChange={(e) => {
            setYoutubeUrl(e.target.value);
            setEdited(true);
          }}
        />

        <Form.Label className="mb-1">Support URL</Form.Label>
        <FormControl
          id="supportUrl"
          className="mb-3"
          aria-describedby="supportUrl"
          value={supportUrl || ""}
          onChange={(e) => {
            setSupportUrl(e.target.value);
            setEdited(true);
          }}
        />

        <hr className="my-4" />

        <FormFile.Label className="mb-1">Avatar</FormFile.Label>
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
          fileSizeLimit={5}
          multiple={false}
          imageDisplayName="Avatar"
        />

        <FormFile.Label className="mb-1">Favicon</FormFile.Label>
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
          fileSizeLimit={0.2}
          multiple={false}
          imageDisplayName="Favicon"
        />

        <hr className="my-4" />

        <Form.Label className="mb-1">Pages</Form.Label>
        <Table bordered className="mb-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pagesCustom && pagesCustom.length > 0
              ? pagesCustom.map((page, i) => (
                  <tr key={i}>
                    <td>
                      <FormControl
                        // id="fullName"
                        // className="mb-3"
                        // aria-describedby="fullName"
                        // value={fullName || ""}
                        value={page.name}
                        onChange={(e) => {
                          let updPages = [];
                          if (pagesCustom && pagesCustom.length > 0) {
                            updPages = JSON.parse(JSON.stringify(pagesCustom));
                          }
                          updPages[i].name = e.target.value;
                          setPagesCustom(updPages);
                          setEdited(true);
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        // id="fullName"
                        // className="mb-3"
                        // aria-describedby="fullName"
                        // value={fullName || ""}
                        value={page.link}
                        onChange={(e) => {
                          let updPages = [];
                          if (pagesCustom && pagesCustom.length > 0) {
                            updPages = JSON.parse(JSON.stringify(pagesCustom));
                          }
                          updPages[i].link = e.target.value;
                          setPagesCustom(updPages);
                          setEdited(true);
                        }}
                      />
                    </td>
                    <td className="text-right" style={{ width: "100px" }}>
                      {i !== 0 ? (
                        <AiOutlineArrowUp
                          className="cursor-pointer"
                          title="up"
                          onClick={() => {
                            let updPages = [];
                            if (pagesCustom && pagesCustom.length > 0) {
                              updPages = JSON.parse(
                                JSON.stringify(pagesCustom)
                              );
                            }
                            updPages.splice(i, 1);
                            updPages.splice(i - 1, 0, page);
                            setPagesCustom(updPages);
                            setEdited(true);
                          }}
                        />
                      ) : null}
                      {i !== pagesCustom.length - 1 ? (
                        <AiOutlineArrowDown
                          className="cursor-pointer"
                          title="down"
                          onClick={() => {
                            let updPages = [];
                            if (pagesCustom && pagesCustom.length > 0) {
                              updPages = JSON.parse(
                                JSON.stringify(pagesCustom)
                              );
                            }
                            updPages.splice(i, 1);
                            updPages.splice(i + 1, 0, page);
                            setPagesCustom(updPages);
                            setEdited(true);
                          }}
                        />
                      ) : null}
                      <FaTimes
                        color="#dc3545"
                        className="cursor-pointer ml-2"
                        title="delete page"
                        onClick={() => {
                          let updPages = [];
                          if (pagesCustom && pagesCustom.length > 0) {
                            updPages = JSON.parse(JSON.stringify(pagesCustom));
                          }
                          updPages.splice(i, 1);
                          setPagesCustom(updPages);
                          setEdited(true);
                        }}
                      />
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>

        {!pagesCustom || pagesCustom.length !== pageOptions.length ? (
          <Dropdown className="mt-2">
            <Dropdown.Toggle variant="link" size="sm" className="pl-0 pt-0">
              Add page
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {pageOptions.map((option, i) => (
                <Fragment key={i}>
                  <Dropdown.Item
                    onClick={() => {
                      // const updPages = [...pages, option];
                      let updPages = [];
                      if (pagesCustom && pagesCustom.length > 0) {
                        updPages = JSON.parse(JSON.stringify(pagesCustom));
                      }
                      // const updPages = JSON.parse(JSON.stringify(pagesCustom));
                      updPages.push({ name: option, link: option });
                      setPagesCustom(updPages);
                      setEdited(true);
                    }}
                    // disabled={pages.includes(option)}
                  >
                    {option}
                  </Dropdown.Item>
                </Fragment>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        ) : null}

        <hr className="my-4" />

        <Accordion>
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
      </Col>
      <Col lg={3}></Col>
    </Row>
  );
}
