import { useState, useEffect, useRef } from "react";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { Icon, Text, VStack, Link } from "@chakra-ui/react";
import moment from "moment";
import { FaCircle } from "react-icons/fa";

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

  // remove past events
  preppedEvents = events.filter(({ start, end }) => {
    if (!end && moment(start).isBefore()) return false;
    if (!!end && moment(end).isAfter()) return true;
    return true;
  });

  // sort events by date
  preppedEvents = preppedEvents.sort((a, b) => {
    const aSortVal = a.start;
    const bSortVal = b.start;
    if (aSortVal < bSortVal) {
      return -1;
    } else if (bSortVal < aSortVal) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <VStack align="start">
      <Category category="Attend an upcoming event" />
      {preppedEvents.map(({ name, start, end, link }) => {
        const formattedDateTime = `${moment(moment(start)).format("MMM D")}${
          end ? ` - ${moment(moment(end)).format("MMM D")}` : ""
        }`;
        return link ? (
          <Link key={name} href={link} isExternal>
            <Text>
              <b>{formattedDateTime}</b>
              &nbsp;&nbsp;&nbsp;
              {name}
            </Text>
          </Link>
        ) : (
          <Text key={name}>
            <b>{formattedDateTime}</b>
            &nbsp;&nbsp;&nbsp;
            {name}
          </Text>
        );
      })}
    </VStack>
  );
};
