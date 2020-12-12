import React, { useState, useEffect, Fragment } from "react";
import { Button, Form, FormControl, Image } from "react-bootstrap";
import { Storage } from "aws-amplify";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import RichTextEditor from "./RichTextEditor";
import { FaTimes } from "react-icons/fa";
export default PostEditor;

function PostEditor({ id = null, onCreate, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    async function fetchData() {
      const imagesCalls = images.map((url) => Storage.get(url));
      const imageUrls = await Promise.all(imagesCalls);
      setImageUrls(imageUrls);
    }
    if (images && images.length) {
      fetchData();
    }
  }, [images]);

  useEffect(() => {
    async function fetchData() {
      const postData = await API.graphql({
        query: queries.getPost,
        variables: { id },
      });

      if (postData) {
        setTitle(postData.data.getPost.title);
        setContent(postData.data.getPost.content);
        setTags(postData.data.getPost.tags);
        setImages(postData.data.getPost.images);
        setCreatedAt(postData.data.getPost.createdAt);
      }
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  function clearEditor() {
    setTitle("");
    setContent("");
    setTags([]);
    setImages([]);
    setImageUrls([]);
    setCreatedAt("");
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    const { key } = await Storage.put(file.name, file, {
      contentType: file.type,
    });
    if (key) {
      const updImages = [...images, key];
      setImages(updImages);
    }
  }

  function handleButtonClick() {
    const data = {
      title,
      content,
      tags,
      images,
    };

    if (id) {
      data.id = id;
      data.createdAt = createdAt;
      onUpdate("post", data);
    } else {
      onCreate("post", data);
    }
    clearEditor();
  }

  return (
    <>
      <Form.Label className="mb-0">Title</Form.Label>
      <FormControl
        id="title"
        className="mb-2"
        aria-describedby="title"
        value={title || ""}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Form.Label className="mb-0">Content</Form.Label>
      {/* <RichTextEditor /> */}
      <FormControl
        id="content"
        className="mb-2"
        as="textarea"
        rows="3"
        aria-describedby="content"
        value={content || ""}
        onChange={(e) => setContent(e.target.value)}
      />

      <Form.Label className="mb-0 mt-2">Tags</Form.Label>
      <FormControl
        id="activetag"
        aria-describedby="activetag"
        value={activeTag || ""}
        onChange={(e) => setActiveTag(e.target.value)}
      />
      <Button
        variant="link"
        size="sm"
        className="mt-2 mb-1 pl-0 pt-0"
        onClick={() => {
          setTags([...tags, activeTag]);
          setActiveTag("");
        }}
      >
        Add
      </Button>
      <ul>
        {tags.map((tag) => (
          <li>{tag}</li>
        ))}
      </ul>

      <Form.File
        id="images"
        className="mb-2"
        label="Images"
        onChange={handleImageUpload}
      />
      <div className="mb-2">
        {imageUrls.map((url, i) => (
          <Fragment key={i}>
            <Image key={url} src={url} width="100" height="auto" thumbnail />
            <FaTimes
              color="#dc3545"
              title="delete image"
              className="cursor-pointer"
              onClick={() => {
                const updImages = images;
                updImages.splice(i, 1);
                console.log(updImages);
                setImages(updImages);
              }}
            />
          </Fragment>
        ))}
      </div>

      <Form.Label className="mb-0">
        Created At (ex: 2020-11-21T17:42:34Z)
      </Form.Label>
      <FormControl
        id="createdAt"
        className="mb-2"
        aria-describedby="createdAt"
        value={createdAt || ""}
        onChange={(e) => setCreatedAt(e.target.value)}
      />

      <Button className="mt-2" onClick={handleButtonClick}>
        {id ? "Update" : "Create"}
      </Button>
    </>
  );
}
