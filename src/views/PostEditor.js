import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  VStack,
  Input,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

import * as queries from "../graphql/queries";
import { createPost, updatePost } from "../graphql/mutations";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import ImageUploader from "../components/ImageUploader";
import TagEditor from "../components/TagEditor";
import useIsMounted from "../lib/useIsMounted";

export default PostEditor;

function PostEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [richContent, setRichContent] = useState();
  const [tagsOptions, setTagsOptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [hidden, setHidden] = useState(false);

  const isMounted = useIsMounted();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const postData = await API.graphql({
        query: queries.getPost,
        variables: { id: params.id },
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

    if (params.id) {
      data.id = params.id;
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  }

  async function handleCreate(data) {
    await API.graphql(graphqlOperation(createPost, { input: data }));
    navigate("/create");
  }

  async function handleUpdate(data) {
    await API.graphql(graphqlOperation(updatePost, { input: data }));
    navigate("/create");
  }

  const selectCategory = category ? { label: category, value: category } : null;
  const selectCategoryOptions = categoryOptions.map((opt) => ({
    label: opt,
    value: opt,
  }));

  return (
    <VStack align="stretch" spacing={8}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          aria-describedby="title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Content</FormLabel>
        <RichTextEditor
          value={richContent}
          onChange={(updRichContent) => {
            setRichContent(updRichContent);
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
            "image",
            "video",
            "kicker",
          ]}
          classes="bg-white"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Images</FormLabel>
        <ImageUploader
          images={images || []}
          afterEdit={(imgs) => {
            setImages(imgs);
          }}
          fieldId="images"
          fileSizeLimit={5}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Category</FormLabel>
        <CreatableSelect
          isClearable
          menuPlacement="auto"
          placeholder=""
          onChange={(newVal) => setCategory(newVal?.value)}
          value={selectCategory}
          options={selectCategoryOptions}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Tags</FormLabel>
        <TagEditor
          tags={tags}
          tagsOptions={tagsOptions}
          onChange={(updTags) => setTags(updTags)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          <Text display="inline" me={3}>
            Created At
          </Text>
          <Text color="gray.400" fontSize="sm" display="inline">
            Optional
          </Text>
        </FormLabel>
        <Input
          placeholder=""
          value={createdAt || ""}
          type="datetime-local"
          onChange={(e) => setCreatedAt(e.target.value)}
        />
        <FormHelperText>
          Only edit this field if you want it to look like you posted something
          at a different date/time than now
        </FormHelperText>
      </FormControl>

      <FormControl>
        <Checkbox checked={hidden} onChange={() => setHidden(!hidden)}>
          Hide from blog
        </Checkbox>
      </FormControl>

      <Box>
        <Button onClick={handleButtonClick}>
          {params.id ? "Update" : "Create"}
        </Button>
      </Box>
    </VStack>
  );
}
