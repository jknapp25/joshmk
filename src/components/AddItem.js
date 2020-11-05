import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Card, Form, FormControl,Image } from "react-bootstrap";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createItem } from "../graphql/mutations";
import * as queries from "../graphql/queries";
import Item from "./Item";
export default AddItem;

const itemTypes = {
  blog: ["title", "description", "tags", "images", "end"],
  work: [
    "title",
    "subTitle",
    "subTitleLink",
    "link",
    "description",
    "tag",
    "tagUsage",
    "complexity",
    "start",
    "end",
  ],
  project: [
    "title",
    "subTitle",
    "subTitleLink",
    "link",
    "description",
    "images",
    "tag",
    "tagUsage",
    "complexity",
    "start",
    "end",
  ],
};

function AddItem() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [subTitleLink, setSubTitleLink] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [complexity, setComplexity] = useState("");
  const [tags, setTags] = useState("");
  const [tagUsage, setTagUsage] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [itemType, setItemType] = useState("blog");

  async function handleAdd() {
    const newTags = tags.split(" ");
    const newTagUsage = tagUsage.split(" ").map((strNum) => parseFloat(strNum));
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
      images,
      start,
      end,
      lastUpdated: "",
      width: "w-100",
    };
    await API.graphql(graphqlOperation(createItem, { input: item }));
    const updItems = [...items, item];
    setItems(updItems);
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    const { key } = await Storage.put(file.name, file, {
      contentType: file.type,
    });
    console.log('upload')
    if (key) {
      console.log(key)
      const updImages = [...images, key];
      console.log(updImages)
      setImages(updImages);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const allItems = await API.graphql({ query: queries.listItems });
      setItems(allItems.data.listItems.items);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const imageUrls = await Storage.get(images[0]);
      setImageUrls([imageUrls]);
    }
    if (images.length) {
      fetchData();
    }
  }, [images]);

  const fields = {
    title: (
      <>
        <Form.Label className="mb-0">Title</Form.Label>
        <FormControl
          id="title"
          className="mb-2"
          aria-describedby="title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </>
    ),
    subTitle: (
      <>
        <Form.Label className="mb-0">SubTitle</Form.Label>
        <FormControl
          id="subTitle"
          className="mb-2"
          aria-describedby="subTitle"
          value={subTitle || ""}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </>
    ),
    subTitleLink: (
      <>
        <Form.Label className="mb-0">SubTitle Link</Form.Label>
        <FormControl
          id="subTitleLink"
          className="mb-2"
          aria-describedby="subTitleLink"
          value={subTitleLink || ""}
          onChange={(e) => setSubTitleLink(e.target.value)}
        />
      </>
    ),
    link: (
      <>
        <Form.Label className="mb-0">Link</Form.Label>
        <FormControl
          id="link"
          className="mb-2"
          aria-describedby="link"
          value={link || ""}
          onChange={(e) => setLink(e.target.value)}
        />
      </>
    ),
    description: (
      <>
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
      </>
    ),
    tags: (
      <>
        <Form.Label className="mb-0">Tags (ex: blog cheese monkey)</Form.Label>
        <FormControl
          id="tags"
          className="mb-2"
          aria-describedby="tags"
          value={tags || ""}
          onChange={(e) => setTags(e.target.value)}
        />
      </>
    ),
    tagUsage: (
      <>
        <Form.Label className="mb-0">Tag Usage (ex: .4 .3 1)</Form.Label>
        <FormControl
          id="tagUsage"
          className="mb-2"
          aria-describedby="tagUsage"
          value={tagUsage || ""}
          onChange={(e) => setTagUsage(e.target.value)}
        />
      </>
    ),
    complexity: (
      <>
        <Form.Label className="mb-0">Complexity (ex: .6)</Form.Label>
        <FormControl
          id="complexity"
          className="mb-2"
          aria-describedby="complexity"
          value={complexity || ""}
          onChange={(e) => setComplexity(e.target.value)}
        />
      </>
    ),
    images: (
      <>
        <Form.File
          id="images"
          className="mb-2"
          label="Images"
          onChange={handleImageUpload}
        />
        <div className="mb-2">
      {imageUrls.map( (url) => 
         (
          <Image src={url} width="100" height="auto" thumbnail />
        )
      )}
      </div>
      </>
    ),
    start: (
      <>
        <Form.Label className="mb-0">Start (ex: 2020-10-14)</Form.Label>
        <FormControl
          id="start"
          className="mb-2"
          aria-describedby="start"
          value={start || ""}
          onChange={(e) => setStart(e.target.value)}
        />
      </>
    ),
    end: (
      <>
        <Form.Label className="mb-0">End (ex: 2020-10-14)</Form.Label>
        <FormControl
          id="end"
          className="mb-2"
          aria-describedby="end"
          value={end || ""}
          onChange={(e) => setEnd(e.target.value)}
        />
      </>
    ),
  };


  return (
    <>
      <ButtonGroup className="d-block mb-4" aria-label="Item type">
        {Object.keys(itemTypes).map((type) => (
          <Button
          key={type}
          variant={type === itemType ? "primary" : "secondary"}
          onClick={() => setItemType(type)}
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
      <Card className="mb-4">
        <Card.Body>
          {itemTypes[itemType].map((field) => fields[field])}
        </Card.Body>
      </Card>
      <Button className="mt-2" onClick={handleAdd}>
        Create item
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
