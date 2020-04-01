import React from "react";
import {
  Badge,
  Card,
  Alert,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import Item from "./Item";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import { FaReact, FaHardHat, FaBaby } from "react-icons/fa";
import {
  IoLogoJavascript,
  IoIosPeople,
  IoIosBuild,
  IoMdMedical
} from "react-icons/io";
import { GiMechanicalArm } from "react-icons/gi";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import selfie from "../assets/ProfilePic.jpg";
import resume from "../assets/resume.pdf";
import work from "../lib/work.json";
export default Work;

const icons = [
  <FaReact color="#61dafb" size="50px" />,
  <IoLogoJavascript color="#f7df1f" size="50px" />,
  <FaHardHat color="#fba15e" size="50px" />,
  <IoIosPeople color="#2d5aff" size="50px" />,
  <IoIosBuild color="#721c24" size="50px" />,
  <GiMechanicalArm color="#000000" size="50px" />,
  <IoMdMedical color="#e32525" size="50px" />,
  <FaBaby color="#de56bbba" size="50px" />
];

function Work() {
  return (
    <>
      <Alert variant="warning">
        Click{" "}
        <Alert.Link href={resume} download="Josh_Knapp_Resume">
          here
        </Alert.Link>{" "}
        for Josh's resume.
      </Alert>
      <VerticalTimeline animate={false} layout="1-column">
        {work.map((item, i) => {
          return (
            <VerticalTimelineElement
              contentStyle={{ padding: "0px" }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)"
              }}
              iconStyle={{ background: "white", color: "white" }}
              icon={icons[item.icon]}
              key={i}
            >
              <Item item={item} bottomMargin="" />
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </>
  );
}
