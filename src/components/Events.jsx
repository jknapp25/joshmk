import { useState, useEffect, useRef } from "react";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { HStack, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import { Category } from "./Category";

export const Events = () => {
  const [events, setEvents] = useState([]);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setEvents([]);

    async function fetchData() {
      const eventsData = await API.graphql({ query: queries.listEvents });
      if (isMounted.current) setEvents(eventsData.data.listEvents.items);
    }
    fetchData();
  }, []);

  if (events.length === 0) return null;

  let preppedEvents = [];

  // sort events by date
  preppedEvents = events.sort((a, b) => {
    const aSortVal = a.start;
    const bSortVal = b.start;
    if (aSortVal < bSortVal) {
      return 1;
    } else if (bSortVal < aSortVal) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <VStack align="start">
      <Category category="Attend an upcoming event" />
      {preppedEvents.map(({ name, start, end, link }) => (
        <HStack key={name}>
          <Text>
            <b>
              {moment(moment(start)).format("MMM D")}
              {end ? ` - ${moment(moment(end)).format("MMM D")}` : ""}
            </b>
            &nbsp;&nbsp;&nbsp;
            {name}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};
