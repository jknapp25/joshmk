import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { FaReact, FaHardHat, FaBaby } from "react-icons/fa";
import {
  IoLogoJavascript,
  IoIosPeople,
  IoIosBuild,
  IoMdMedical,
} from "react-icons/io";
import { GiMechanicalArm, GiCrosscutSaw } from "react-icons/gi";
import Job from "./Job";
import "react-vertical-timeline-component/style.min.css";
import "../App.css";
export default Work;

const icons = [
  <FaReact color="#61dafb" size="50px" />,
  <IoLogoJavascript color="#f7df1f" size="50px" />,
  <FaHardHat color="#fba15e" size="50px" />,
  <IoIosPeople color="#2d5aff" size="50px" />,
  <IoIosBuild color="#721c24" size="50px" />,
  <GiMechanicalArm color="#000000" size="50px" />,
  <IoMdMedical color="#e32525" size="50px" />,
  <FaBaby color="#de56bbba" size="50px" />,
  <GiCrosscutSaw color="#7e56deba" size="50px" />,
];

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
          icon={icons[0]}
          className="mb-3 mt-0"
        >
          <Job job={item} />
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
