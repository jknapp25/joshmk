import React, { useState, useEffect } from "react";
import { Button, Form, FormControl, FormFile } from "react-bootstrap";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import ImageUploader from "./ImageUploader";
import TagEditor from "./TagEditor";
import CreatableSelect from "react-select/creatable";
import { useIsMounted } from "../lib/utils";
export default PostEditor;

const blankEditorValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

function PostEditor({ id = null, onCreate, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [richContent, setRichContent] = useState(blankEditorValue);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [hidden, setHidden] = useState(false);

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
        if (postData.data.getPost.richContent) {
          const richContentResponse = JSON.parse(
            postData.data.getPost.richContent
          );
          setRichContent(richContentResponse);
        }
        setTags(postData.data.getPost.tags);
        setCategory(postData.data.getPost.category);
        setImages(postData.data.getPost.images);
        setCreatedAt(postData.data.getPost.createdAt);
        setHidden(postData.data.getPost.hidden);
      }
    }
    if (id) {
      fetchData();
    }
  }, [id, isMounted]);

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
    setTitle("");
    setContent("");
    setRichContent(blankEditorValue);
    setTags([]);
    setCategory("");
    setImages([]);
    setCreatedAt("");
    setHidden(false);
  }

  function handleButtonClick() {
    const data = {
      title,
      content,
      richContent: JSON.stringify(richContent),
      tags,
      category,
      images,
      createdAt: createdAt || undefined,
      hidden,
    };

    if (id) {
      data.id = id;
      onUpdate("post", data);
    } else {
      onCreate("post", data);
    }

    if (isMounted.current) clearEditor();
  }

  const selectCategory = category ? { label: category, value: category } : null;
  const selectCategoryOptions = categoryOptions.map((opt) => ({
    label: opt,
    value: opt,
  }));

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
      <RichTextEditor
        value={richContent}
        onChange={(updRichContent) => setRichContent(updRichContent)}
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

      <FormFile.Label className="mb-1">Images</FormFile.Label>
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

      <Form.Check
        type="checkbox"
        label="Hidden"
        checked={hidden}
        onChange={() => setHidden(!hidden)}
      />

      <Button className="mt-2" onClick={handleButtonClick}>
        {id ? "Update" : "Create"}
      </Button>
    </>
  );
}
