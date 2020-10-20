import React, { useState, useEffect } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createItem } from "../graphql/mutations";
import * as queries from "../graphql/queries";
import Item from "./Item";
export default AddItem;

// {
//   "title": "3 years later",
//   "subtitle": null,
//   "subtitleLink": null,
//   "link": null,
//   "tags": ["blog", "Photography", "Marriage", "Women", "Love"],
//   "tagUsage": [1, 1, 1, 1, 1],
//   "description": "Today we took pictures of Riah in her wedding dress on Manzanita Beach. She's been wanting to do this for the last three years. I love how they turned out. Naturally I like the more smiley ones, but she likes the more mysterious ones.",
//   "complexity": null,
//   "images": [37, 38, 39, 40, 41],
//   "start": null,
//   "end": "2020-10-08",
//   "lastUpdated": null,
//   "width": "w-100"
// },

function AddItem() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [subTitleLink, setSubTitleLink] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [complexity, setComplexity] = useState("");
  const [tags, setTags] = useState("");
  const [tagUsage, setTagUsage] = useState("");
  const [images, setImages] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [items, setItems] = useState([]);

  async function handleAdd() {
    const newTags = tags.split(" ");
    const newTagUsage = tagUsage.split(" ").map((strNum) => parseFloat(strNum));
    const newImages = images.split(" ").map((strNum) => parseInt(strNum, 10));
    const newComplexity = parseFloat(complexity);

    const item = {
      title,
      description,
      subTitle,
      subTitleLink,
      link,
      tags: newTags,
      tagUsage: newTagUsage,
      complexity: newComplexity,
      images: newImages,
      start,
      end,
      lastUpdated: "",
      width: "w-100",
    };
    await API.graphql(graphqlOperation(createItem, { input: item }));
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    Storage.put(file.name, file, { contentType: file.type })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    async function fetchData() {
      const allItems = await API.graphql({ query: queries.listItems });
      setItems(allItems.data.listItems.items);
    }
    fetchData();
  }, []);

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
      <Form.Label className="mb-0">SubTitle</Form.Label>
      <FormControl
        id="subTitle"
        className="mb-2"
        aria-describedby="subTitle"
        value={subTitle || ""}
        onChange={(e) => setSubTitle(e.target.value)}
      />
      <Form.Label className="mb-0">SubTitle Link</Form.Label>
      <FormControl
        id="subTitleLink"
        className="mb-2"
        aria-describedby="subTitleLink"
        value={subTitleLink || ""}
        onChange={(e) => setSubTitleLink(e.target.value)}
      />
      <Form.Label className="mb-0">Link</Form.Label>
      <FormControl
        id="link"
        className="mb-2"
        aria-describedby="link"
        value={link || ""}
        onChange={(e) => setLink(e.target.value)}
      />
      <Form.Label className="mb-0">Description</Form.Label>
      <FormControl
        id="description"
        className="mb-2"
        as="textarea"
        rows="3"
        aria-describedby="description"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Form.Label className="mb-0">Tags</Form.Label>
      <FormControl
        id="tags"
        className="mb-2"
        aria-describedby="tags"
        value={tags || ""}
        onChange={(e) => setTags(e.target.value)}
      />
      <Form.Label className="mb-0">Tag Usage</Form.Label>
      <FormControl
        id="tagUsage"
        className="mb-2"
        aria-describedby="tagUsage"
        value={tagUsage || ""}
        onChange={(e) => setTagUsage(e.target.value)}
      />
      <Form.Label className="mb-0">Complexity</Form.Label>
      <FormControl
        id="complexity"
        className="mb-2"
        aria-describedby="complexity"
        value={complexity || ""}
        onChange={(e) => setComplexity(e.target.value)}
      />
      <Form.Label className="mb-0">Images</Form.Label>
      {/* <FormControl
        id="images"
        className="mb-2"
        aria-describedby="images"
        value={images || ""}
        onChange={(e) => setImages(e.target.value)}
      /> */}
      <Form.File id="images" label="Image input" onChange={handleImageUpload} />
      <Form.Label className="mb-0">Start (ex: 2020-10-14)</Form.Label>
      <FormControl
        id="start"
        className="mb-2"
        aria-describedby="start"
        value={start || ""}
        onChange={(e) => setStart(e.target.value)}
      />
      <Form.Label className="mb-0">End</Form.Label>
      <FormControl
        id="end"
        className="mb-2"
        aria-describedby="end"
        value={end || ""}
        onChange={(e) => setEnd(e.target.value)}
      />
      <Button className="mt-2" onClick={handleAdd}>
        Add item
      </Button>

      <hr />

      {items.length > 0 ? (
        items.map((item, i) => <Item item={item} bottomMargin="mb-4" key={i} />)
      ) : (
        <div>No items</div>
      )}
    </>
  );
}
