import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { FaReact } from "react-icons/fa";
import Job from "./Job";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
export default Work;

function Work({ items }) {
  return (
    <VerticalTimeline animate={false} layout="1-column">
      {items.map((item, i) => (
        <VerticalTimelineElement
          key={i}
          contentStyle={{
            padding: "0px",
            boxShadow: "none",
          }}
          contentArrowStyle={{
            borderRight: "7px solid  rgb(33, 150, 243)",
          }}
          iconStyle={{ background: "white", color: "white" }}
          icon={<FaReact color="#61dafb" size="50px" />}
          className="mb-3 mt-0"
        >
          <Job job={item} />
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
