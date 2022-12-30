import { useState, Fragment, useContext } from "react";
import {
  Card,
  Col,
  Dropdown,
  Form,
  FormControl,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Button, Heading, VStack, Text } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { API, graphqlOperation } from "aws-amplify";
import { createConfiguration, updateConfiguration } from "../graphql/mutations";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Helmet from "react-helmet";

import { ConfigContext } from "../App";
import ImageUploader from "../components/ImageUploader";

export default withAuthenticator(Settings);

const pageOptions = ["blog", "work", "projects", "gallery", "about", "other"];

function Settings() {
  const config = useContext(ConfigContext);

  const [settings, setSettings] = useState(config);
  const [edited, setEdited] = useState(false);

  const configIdName = "REACT_APP_CONFIGURATION_ID";

  async function handleSave() {
    let { setConfig, createdAt, updatedAt, ...payload } = settings;
    payload.bio = JSON.stringify(payload.bio);

    let action = createConfiguration;
    if (process.env[configIdName]) {
      action = updateConfiguration;
      payload.id = process.env[configIdName];
    }

    const success = await API.graphql(
      graphqlOperation(action, { input: payload })
    );

    if (success) {
      config.setConfig(settings);
    }
  }

  function handleUpdate(field, val, triggerEdit = true) {
    let updSettings = { ...settings };
    updSettings[field] = val;
    setSettings(updSettings);

    if (triggerEdit) setEdited(true);
  }

  return (
    <VStack align="stretch" spacing={10}>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <Heading size="xl">Settings</Heading>

      <VStack spacing={2} align="start">
        <Heading size="sm">Full Name</Heading>
        <Text>
          Your full name will appear in the top left of the navbar if you
          haven't added a logo.
        </Text>
        <FormControl
          id="fullName"
          aria-describedby="fullName"
          value={settings.fullName || ""}
          onChange={(e) => handleUpdate("fullName", e.target.value)}
        />
      </VStack>

      <VStack spacing={2} align="start">
        <Heading size="sm">Logo</Heading>
        <Text>
          An image that will appear in the top left of the navbar. It's common
          to use a handwritten version of your name.
        </Text>
        <ImageUploader
          images={settings.logo ? [settings.logo] : []}
          afterEdit={(imgs) => {
            const updLogo = imgs?.length > 0 ? imgs[0] : "";
            handleUpdate("logo", updLogo);
          }}
          fieldId="logo"
          fileSizeLimit={5}
          allowMultiple={false}
          imageDisplayName="Logo"
        />
      </VStack>

      <VStack spacing={2} align="start">
        <Heading size="sm">Favicon</Heading>
        <Text>
          A favicon is the tiny image that shows in your browsers tab. The max
          size is <b>200kb</b>.
        </Text>
        <ImageUploader
          images={settings.favicon ? [settings.favicon] : []}
          afterEdit={(imgs) => {
            const updFavicon = imgs?.length > 0 ? imgs[0] : "";
            handleUpdate("favicon", updFavicon);
          }}
          fieldId="favicon"
          fileSizeLimit={0.2}
          allowMultiple={false}
          imageDisplayName="Favicon"
        />
      </VStack>

      <VStack spacing={2} align="start">
        <Heading size="sm">Avatar</Heading>
        <Text>
          Your avatar is an image that represents you. It will appear at the top
          of the right sidebar on the homepage.
        </Text>
        <ImageUploader
          images={settings.avatar ? [settings.avatar] : []}
          afterEdit={(imgs) => {
            const updAvatar = imgs?.length > 0 ? imgs[0] : "";
            handleUpdate("avatar", updAvatar);
          }}
          fieldId="avatar"
          fileSizeLimit={5}
          allowMultiple={false}
          imageDisplayName="Avatar"
        />
      </VStack>

      <VStack spacing={2} align="start">
        <Heading size="sm">Tagline</Heading>
        <Text>Your tagline will show under your avatar on the homepage.</Text>
        <FormControl
          id="tagline"
          as="textarea"
          rows={2}
          aria-describedby="tagline"
          value={settings.tagline || ""}
          onChange={(e) => handleUpdate("tagline", e.target.value)}
        />
      </VStack>

      <VStack spacing={2} align="start">
        <Heading size="sm">Pages</Heading>
        <Text>
          These are the pages that will show in the top navbar. Here are
          examples of how this can be set up...
        </Text>
        <Text>
          <ul>
            <li>
              <b>gallery | gallery</b> - This is a basic page.
            </li>
            <li>
              <b>poetry | search?tag=poetry</b> - This will direct the user to a
              tag search.
            </li>
            <li>
              <b>about | post/f4ec738a-65e2-4cf9-9696-dd8c83d7763d</b> - This
              will direct the user to a specific post.
            </li>
          </ul>
        </Text>
        {settings.pagesCustom?.length > 0
          ? settings.pagesCustom.map((page, i) => (
              <Row key={`page-${i}`} className="d-flex mb-2 align-items-center">
                <Col>
                  <FormControl
                    id={`pagesCustom-name-${i}`}
                    aria-describedby={`pagesCustom name ${i}`}
                    value={page.name}
                    placeholder="Add page name"
                    onChange={(e) => {
                      let updPages =
                        settings.pagesCustom?.length > 0
                          ? JSON.parse(JSON.stringify(settings.pagesCustom))
                          : [];
                      updPages[i].name = e.target.value;
                      handleUpdate("pagesCustom", updPages);
                    }}
                  />
                </Col>
                <Col>
                  <FormControl
                    id={`pagesCustom-link-${i}`}
                    aria-describedby={`pagesCustom link ${i}`}
                    value={page.link}
                    placeholder="Add link"
                    onChange={(e) => {
                      let updPages =
                        settings.pagesCustom?.length > 0
                          ? JSON.parse(JSON.stringify(settings.pagesCustom))
                          : [];
                      updPages[i].link = e.target.value;
                      handleUpdate("pagesCustom", updPages);
                    }}
                  />
                </Col>
                <Col
                  className="text-right d-flex justify-content-between"
                  style={{ maxWidth: "100px", width: "100px" }}
                >
                  <div>
                    {i !== 0 ? (
                      <AiOutlineArrowUp
                        className="cursor-pointer"
                        title="up"
                        onClick={() => {
                          let updPages =
                            settings.pagesCustom?.length > 0
                              ? JSON.parse(JSON.stringify(settings.pagesCustom))
                              : [];
                          updPages.splice(i, 1);
                          updPages.splice(i - 1, 0, page);
                          handleUpdate("pagesCustom", updPages);
                        }}
                      />
                    ) : null}
                    {i !== settings.pagesCustom.length - 1 ? (
                      <AiOutlineArrowDown
                        className="cursor-pointer"
                        title="down"
                        onClick={() => {
                          let updPages =
                            settings.pagesCustom?.length > 0
                              ? JSON.parse(JSON.stringify(settings.pagesCustom))
                              : [];
                          updPages.splice(i, 1);
                          updPages.splice(i + 1, 0, page);
                          handleUpdate("pagesCustom", updPages);
                        }}
                      />
                    ) : null}
                  </div>
                  <div>
                    <FaTimes
                      color="#dc3545"
                      className="cursor-pointer ms-2 float-right"
                      title="delete page"
                      onClick={() => {
                        let updPages =
                          settings.pagesCustom?.length > 0
                            ? JSON.parse(JSON.stringify(settings.pagesCustom))
                            : [];
                        updPages.splice(i, 1);
                        handleUpdate("pagesCustom", updPages);
                      }}
                    />
                  </div>
                </Col>
              </Row>
            ))
          : null}

        <Dropdown>
          <Dropdown.Toggle variant="link" size="sm" className="ps-0">
            Add page
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {pageOptions.map((option, i) => (
              <Fragment key={`pageOption-${i}`}>
                <Dropdown.Item
                  onClick={() => {
                    let updPages =
                      settings.pagesCustom?.length > 0
                        ? JSON.parse(JSON.stringify(settings.pagesCustom))
                        : [];
                    updPages.push({ name: option, link: option });
                    handleUpdate("pagesCustom", updPages);
                  }}
                >
                  {option}
                </Dropdown.Item>
              </Fragment>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </VStack>

      <VStack spacing={2} align="start">
        <Heading size="sm">Prompts</Heading>
        <p className="small">
          Prompts are important items that you want visitors to see. They appear
          on the left of the homepage at the top. It is a full post that is
          loaded in the sidebar, so keep it short.
        </p>

        {settings.prompts?.length > 0
          ? settings.prompts.map((prompt, i) => (
              <Card key={`prompts-${i}`} className="mb-3">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>Prompt {i + 1}</div>
                  <FaTimes
                    color="#dc3545"
                    className="cursor-pointer"
                    title="delete prompt"
                    onClick={() => {
                      let updPrompts =
                        settings.prompts?.length > 0
                          ? JSON.parse(JSON.stringify(settings.prompts))
                          : [];
                      updPrompts.splice(i, 1);
                      handleUpdate("prompts", updPrompts);
                    }}
                  />
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Form.Label>Title</Form.Label>
                    <FormControl
                      className="mb-2"
                      id={`prompts-title-${i}`}
                      aria-describedby={`prompts title ${i}`}
                      value={prompt.title}
                      onChange={(e) => {
                        let updPrompts =
                          settings.prompts?.length > 0
                            ? JSON.parse(JSON.stringify(settings.prompts))
                            : [];
                        updPrompts[i].title = e.target.value;
                        handleUpdate("prompts", updPrompts);
                      }}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {prompt.images.map((img, j) => (
                      <Row key={`prompt-image-${j}`} className="mb-2">
                        <Col>
                          <Form.Label>Image</Form.Label>
                          <ImageUploader
                            images={img.imageUrl ? [img.imageUrl] : []}
                            afterEdit={(imgs) => {
                              let updPrompts =
                                settings.prompts && settings.prompts.length > 0
                                  ? JSON.parse(JSON.stringify(settings.prompts))
                                  : [];

                              updPrompts[i].images[j].imageUrl = imgs[0];
                              handleUpdate("prompts", updPrompts);

                              setEdited(true);
                            }}
                            fieldId={`prompt-image-upload-${i}`}
                            fileSizeLimit={5}
                            allowMultiple={false}
                          />
                        </Col>
                        <Col>
                          <Form.Label>Link</Form.Label>
                          <FormControl
                            id={`prompts-link-${i}`}
                            aria-describedby={`prompts link ${i}`}
                            value={img.link}
                            placeholder="Add link"
                            onChange={(e) => {
                              let updPrompts =
                                settings.prompts?.length > 0
                                  ? JSON.parse(JSON.stringify(settings.prompts))
                                  : [];

                              updPrompts[i].images[j].link = e.target.value;
                              handleUpdate("prompts", updPrompts);
                            }}
                          />
                        </Col>
                      </Row>
                    ))}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ))
          : null}
        <Button
          className="d-block ps-0"
          variant="link"
          colorScheme="blue"
          size="sm"
          onClick={() => {
            let updPrompts = settings.prompts ? [...settings.prompts] : [];
            const newPrompt = {
              title: "",
              images: [{ imageUrl: "", link: "" }],
            };
            updPrompts.push(newPrompt);
            handleUpdate("prompts", updPrompts, false);
          }}
        >
          Add prompt
        </Button>
      </VStack>

      <Button
        colorScheme="blue"
        onClick={() => {
          if (edited) {
            handleSave();
          }
        }}
        isDisabled={!edited}
      >
        Save changes
      </Button>
    </VStack>
  );
}
