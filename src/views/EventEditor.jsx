import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Input,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import * as queries from "../graphql/queries";
import { createEvent, updateEvent } from "../graphql/mutations";
import useIsMounted from "../lib/useIsMounted";

export const EventEditor = () => {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [link, setLink] = useState("");

  const isMounted = useIsMounted();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const eventData = await API.graphql({
        query: queries.getEvent,
        variables: { id: params.id },
      });

      if (eventData && isMounted.current) {
        setName(eventData.data.getEvent.name);
        setStart(eventData.data.getEvent.start);
        setEnd(eventData.data.getEvent.end);
        setLink(eventData.data.getEvent.link);
      }
    }
    if (params.id) {
      fetchData();
    }
  }, [params.id, isMounted]);

  function handleButtonClick() {
    let startFormatted, endFormatted;
    if (start) {
      startFormatted = new Date(start);
      startFormatted = startFormatted.toISOString();
    }
    if (end) {
      endFormatted = new Date(end);
      endFormatted = endFormatted.toISOString();
    }

    console.log(start, end);

    const data = {
      name,
      start: startFormatted,
      end: endFormatted,
      link,
    };

    if (params.id) {
      data.id = params.id;
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  }

  async function handleCreate(data) {
    await API.graphql(graphqlOperation(createEvent, { input: data }));
    navigate("/create");
  }

  async function handleUpdate(data) {
    await API.graphql(graphqlOperation(updateEvent, { input: data }));
    navigate("/create");
  }

  return (
    <VStack align="stretch" spacing={8}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          id="name"
          aria-describedby="name"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          <Text display="inline" me={3}>
            Start
          </Text>
        </FormLabel>
        <FormHelperText mb={3}>
          Select a datetime for the start of the event
        </FormHelperText>
        <Input
          placeholder=""
          value={start ? moment(start).format("YYYY-MM-DDTHH:mm:ss") : ""}
          type="datetime-local"
          onChange={(e) => {
            setStart(e.target.value);
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          <Text display="inline" me={2}>
            End
          </Text>
          <Text color="gray.400" fontSize="xs" display="inline">
            Optional
          </Text>
        </FormLabel>
        <FormHelperText mb={3}>
          Select a datetime for the end of the event
        </FormHelperText>
        <Input
          placeholder=""
          value={end ? moment(end).format("YYYY-MM-DDTHH:mm:ss") : ""}
          type="datetime-local"
          onChange={(e) => setEnd(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          <Text display="inline" me={2}>
            Link
          </Text>
          <Text color="gray.400" fontSize="xs" display="inline">
            Optional
          </Text>
        </FormLabel>
        <FormHelperText mb={3}>
          A link to a post or site for more details about the event
        </FormHelperText>
        <Input
          id="link"
          aria-describedby="link"
          value={link || ""}
          onChange={(e) => setLink(e.target.value)}
        />
      </FormControl>

      <Box>
        <Button colorScheme="blue" onClick={handleButtonClick}>
          {params.id ? "Update" : "Create"}
        </Button>
      </Box>
    </VStack>
  );
};
