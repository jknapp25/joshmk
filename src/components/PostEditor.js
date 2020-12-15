import React, { useState, useEffect } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import RichTextEditor from "./RichTextEditor";
import ImageUploader from "./ImageUploader";
import { useIsMounted } from "../lib/utils";
export default PostEditor;

function PostEditor({ id = null, onCreate, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const postData = await API.graphql({
        query: queries.getPost,
        variables: { id },
      });

      if (postData && isMounted.current) {
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
  }, [id, isMounted]);

  function clearEditor() {
    setTitle("");
    setContent("");
    setTags([]);
    setImages([]);
    setCreatedAt("");
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

    if (isMounted.current) clearEditor();
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

      <ImageUploader
        images={images || []}
        afterEdit={(imgs) => {
          setImages(imgs);
        }}
        fieldId="images"
        fieldLabel="Images"
      />

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
