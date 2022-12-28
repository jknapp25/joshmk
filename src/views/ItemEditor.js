import { useState, useEffect } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import CreatableSelect from "react-select/creatable";
import { useNavigate, useParams } from "react-router-dom";

import * as queries from "../graphql/queries";
import { createItem, updateItem } from "../graphql/mutations";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import ImageUploader from "../components/ImageUploader";
import TagEditor from "../components/TagEditor";
import useIsMounted from "../lib/useIsMounted";

export default ItemEditor;

const blankEditorValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

function ItemEditor() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(blankEditorValue);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [isForSale, setIsForSale] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const [price, setPrice] = useState(0);

  const isMounted = useIsMounted();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const itemData = await API.graphql({
        query: queries.getItem,
        variables: { id: params.id },
      });

      if (itemData && isMounted.current) {
        setName(itemData.data.getItem.name);
        if (itemData.data.getItem.description) {
          const richContentResponse = JSON.parse(
            itemData.data.getItem.description
          );
          setDescription(richContentResponse);
        }
        setTags(itemData.data.getItem.tags);
        setCategory(itemData.data.getItem.category);
        setImages(itemData.data.getItem.images);
        setCreatedAt(itemData.data.getItem.createdAt);
        setIsForSale(itemData.data.getItem.isForSale);
        setIsSold(itemData.data.getItem.isSold);
        setPrice(itemData.data.getItem.price);
      }
    }
    if (params.id) {
      fetchData();
    }
  }, [params.id, isMounted]);

  useEffect(() => {
    async function fetchData() {
      const categories = await API.graphql({
        query: `query ListCategories {
          listPosts(filter: {category: {attributeType: string}}) {
            items {
              category
            }
          }
        }     
      `,
      });

      const preppedCats = categories.data.listPosts.items.reduce(
        (acc, curr) => {
          if (curr.category) {
            return [...acc, curr.category];
          } else {
            return acc;
          }
        },
        []
      );

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      const uniqueCats = preppedCats.filter(onlyUnique);

      setCategoryOptions(uniqueCats);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const tags = await API.graphql({
        query: `query ListTags {
          listPosts(filter: {tags: {attributeType: list, size: {gt: 0}}}) {
            items {
              tags
            }
          }
        }   
      `,
      });

      const preppedTags = tags.data.listPosts.items.reduce((acc, curr) => {
        if (curr.tags && curr.tags.length > 0) {
          return [...acc, ...curr.tags];
        } else {
          return acc;
        }
      }, []);

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      const uniqueTags = preppedTags.filter(onlyUnique);

      setTagsOptions(uniqueTags);
    }

    fetchData();
  }, []);

  function clearEditor() {
    setName("");
    setDescription(blankEditorValue);
    setTags([]);
    setCategory("");
    setImages([]);
    setCreatedAt("");
    setIsForSale(false);
    setIsSold(false);
    setPrice(0);
  }

  function handleButtonClick() {
    let data = {
      name,
      description: JSON.stringify(description),
      tags,
      category,
      images,
      createdAt: createdAt || undefined,
      isForSale,
      isSold,
      price,
    };

    if (params.id) {
      data.id = params.id;
      data.price = parseFloat(data.price) || 0;
      handleUpdate(data);
    } else {
      handleCreate(data);
    }

    if (isMounted.current) clearEditor();
  }

  async function handleCreate(data) {
    await API.graphql(graphqlOperation(createItem, { input: data }));
    navigate("/create");
  }

  async function handleUpdate(data) {
    await API.graphql(graphqlOperation(updateItem, { input: data }));
    navigate("/create");
  }

  const selectCategory = category ? { label: category, value: category } : null;
  const selectCategoryOptions = categoryOptions.map((opt) => ({
    label: opt,
    value: opt,
  }));

  return (
    <>
      <Form.Label className="mb-0">Name</Form.Label>
      <FormControl
        id="name"
        className="mb-2"
        aria-describedby="name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />

      <Form.Label className="mb-0">Description</Form.Label>
      <RichTextEditor
        value={description}
        onChange={(updDescription) => setDescription(updDescription)}
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
        classes="bg-white mb-2"
      />

      <Form.Label className="mb-1">Images</Form.Label>
      <ImageUploader
        images={images || []}
        afterEdit={(imgs) => {
          setImages(imgs);
        }}
        fieldId="images"
        fileSizeLimit={5}
      />

      <Form.Label className="mb-0">Category</Form.Label>
      <CreatableSelect
        isClearable
        onChange={(newVal) => setCategory(newVal?.value)}
        value={selectCategory}
        options={selectCategoryOptions}
      />

      <TagEditor
        tags={tags}
        tagsOptions={tagsOptions}
        onChange={(updTags) => setTags(updTags)}
      />

      <Form.Check
        type="switch"
        id="isForSale"
        label="For sale"
        className="mt-2"
        value={isForSale}
        onChange={() => setIsForSale(!isForSale)}
      />
      <Form.Label className="mb-0">Price</Form.Label>
      <FormControl
        id="price"
        className="mb-2"
        aria-describedby="price"
        value={price}
        onChange={(e) => {
          if (
            !isNaN(e.target.value) ||
            e.target.value === "" ||
            e.target.value === "."
          ) {
            setPrice(e.target.value);
          }
        }}
      />
      <Form.Check
        type="switch"
        id="isSold"
        label="Is this item sold?"
        className="mt-2"
        value={isSold}
        onChange={() => setIsSold(!isSold)}
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
        {params.id ? "Update" : "Create"}
      </Button>
    </>
  );
}
