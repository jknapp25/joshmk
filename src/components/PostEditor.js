import React, { useState, useEffect } from "react";
import { Button, Form, FormControl, Image } from "react-bootstrap";
import { Storage } from "aws-amplify";
export default PostEditor;

function PostEditor({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const imagesCalls = images.map((url) => {
        return Storage.get(url);
      })
      const imageUrls = await Promise.all(imagesCalls)
      setImageUrls(imageUrls);
    }
    if (images && images.length) {
      fetchData();
    }
  }, [images]);

  function clearEditor() {
    setTitle('');
    setContent('');
    setTags('');
    setImages([]);
    setImageUrls([]);
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
    const updTags = tags.split(' ');
    const data = {
      title,
      content,
      tags: updTags,
      images,
    }

    onCreate('post', data);
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
      <FormControl
        id="content"
        className="mb-2"
        as="textarea"
        rows="3"
        aria-describedby="content"
        value={content || ""}
        onChange={(e) => setContent(e.target.value)}
      />

      <Form.Label className="mb-0">Tags (ex: blog cheese monkey)</Form.Label>
      <FormControl
        id="tags"
        className="mb-2"
        aria-describedby="tags"
        value={tags || ""}
        onChange={(e) => setTags(e.target.value)}
      />

      <Form.File
        id="images"
        className="mb-2"
        label="Images"
        onChange={handleImageUpload}
      />
      <div className="mb-2">
        {imageUrls.map((url, i) =>
          (
            <Image key={url} src={url} width="100" height="auto" thumbnail />
          )
        )}
      </div>

      <Button className="mt-2" onClick={handleButtonClick}>
        Create
      </Button>
    </>
  );
}
