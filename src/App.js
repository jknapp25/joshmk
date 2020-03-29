import React, { useState } from "react";
import {
  Badge,
  Card,
  Tabs,
  Tab,
  Container,
  Row,
  Col,
  Nav,
  Fade,
  Alert,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
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
import VisibilitySensor from "react-visibility-sensor";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import pic from "./assets/ProfilePic.jpg";
import pic2 from "./assets/inventionofsound.jpeg";
import pic3 from "./assets/josh_logo.png";
import pic4 from "./assets/libby_van.jpeg";
import pic5 from "./assets/van_death.jpeg";
import pic6 from "./assets/tumps_assistant.jpeg";
import pic7 from "./assets/josh_logo_5.png";
import resume from "./assets/resume.pdf";
export default App;

const projects = [
  {
    title: "Storyline",
    link: "https://github.com/jknapp25/storyline",
    tags: ["ReactJS", "vis", "react-boostrap"],
    description: "Story building tool",
    img: null,
    date: null
  },
  {
    title: "Scrumy",
    link: "https://github.com/jknapp25/scrumy",
    tags: ["ReactJS", "react-boostrap"],
    description: "Personal SCRUM tool",
    img: null,
    date: null
  },
  {
    title: "Personal Site 2",
    link: null,
    tags: ["ReactJS", "react-boostrap"],
    description: "Current site you are on",
    img: null,
    date: null
  },
  {
    title: "Personal Site 1",
    link: null,
    tags: ["HTML", "CSS", "JavaScript"],
    description: "My first full website I build",
    img: null,
    date: null
  }
];

const writing = [
  {
    title: "Prevent unnecessary re-render’s in React components",
    link:
      "https://medium.com/@joshknapp/prevent-unnecessary-re-renders-in-react-components-7130b966dad3",
    tags: ["ReactJS", "software"],
    description: "The useEffect dependency array",
    img: null,
    date: "Feb 13, 2020"
  },
  {
    title: "My Dream Home (on wheels)",
    link: "https://medium.com/@joshknapp/my-dream-home-on-wheels-bb59304fd686",
    tags: ["VanLife"],
    description: "A wish-list of features…",
    img: pic4,
    date: "Jan 26, 2020"
  },
  {
    title: "All women are worth protecting",
    link:
      "https://medium.com/the-magnificent-kingdom/all-women-are-worth-protecting-646a5a461896",
    tags: ["Life", "Women"],
    description:
      "Your ex-girlfriend, your barista, your mom, your friends friend, your mother-in-law, your step-sister, every one of them.",
    img: null,
    date: "Dec 26, 2018"
  },
  {
    title: "I’m now Trump’s OFFICIAL personal assistant!",
    link:
      "https://medium.com/@joshknapp/im-now-trump-s-official-personal-assistant-a824b538681d",
    tags: ["Fiction", "Politics"],
    description:
      "Through a family friend, a young woman receives the honored role as Trump's personal assistant. Or so she thinks.",
    img: pic6,
    date: "Jun 19, 2018"
  },
  {
    title: "The Invention of Sound",
    link:
      "https://medium.com/the-magnificent-kingdom/the-invention-of-sound-34d36210c4a7",
    tags: ["Fiction"],
    description:
      "An old instrument builder living on the edge of a dense forest receives a letter from an unknown source, kicking off an adventure the world has always been waiting for.",
    img: pic2,
    date: "May 23, 2018"
  },
  {
    title: "Beware of Falling Objects",
    link:
      "https://medium.com/@joshknapp/beware-of-falling-objects-ff1995423d9a",
    tags: ["Life"],
    description: "How it feels having your home-on-wheels deleted by a tree",
    img: pic5,
    date: "May 5, 2018"
  }
];

const work = [
  {
    company: "ASML",
    companyLink: "https://www.asml.com/en",
    position: "Software Engineer",
    location: "Hillsboro, OR",
    description:
      "Part of an exciting internal software development team delivering a tool for deployment and maintenance of next generation semiconductor lithography machines.",
    present: true,
    start: "November 2018",
    end: null,
    icon: 0,
    badge: false,
    badgeVariant: null,
    badgeText: null,
    people: ["Bob", "Mark"]
  },
  {
    company: "ASML",
    companyLink: "https://www.asml.com/en",
    position: "Software Engineer & Data Analyst",
    location: "Hillsboro, OR",
    description:
      "Successfully developed an MVP for maintenance planning software, highlighting a need for internal operations tracking software and kicking off 3 internal software development teams.",
    present: false,
    start: "March 2017",
    end: "November 2018",
    icon: 1,
    badge: true,
    badgeVariant: "secondary",
    badgeText: "Contract"
  },
  {
    company: "Edge Development",
    companyLink: "https://edgedevelopment.net/",
    position: "Assistant to Superintendents",
    location: "Portland, OR",
    description:
      "Represented Contractors and Superintendents on job sites when they were at other sites.",
    present: false,
    start: "December 2016",
    end: "March 2017",
    icon: 2,
    badge: false,
    badgeVariant: null,
    badgeText: null
  },
  {
    company: "Marble Technologies",
    companyLink: null,
    position: "Co-Founder & Creative Director",
    location: "Portland, OR",
    description:
      "Grew a profitable website client base from an untapped Portland market",
    present: false,
    start: "December 2016",
    end: "March 2017",
    icon: 3,
    badge: false,
    badgeVariant: null,
    badgeText: null
  },
  {
    company: "TriMike Creations",
    companyLink: "https://www.trimike.com/",
    position: "Mechanical Engineering Intern",
    location: "Albany, OR",
    description:
      "Participated in delivering products of all shapes and sizes for over 30 contract jobs. Client base included Boeing, Allann Brothers, etc.",
    present: false,
    start: "June 2014",
    end: "September 2014",
    icon: 4,
    badge: false,
    badgeVariant: null,
    badgeText: null
  },
  {
    company: "OSU Robotics & Human Control Systems Lab",
    companyLink: "http://research.engr.oregonstate.edu/rhcs/home",
    position: "Research Assistant",
    location: "Corvallis, OR",
    description: "Research into autonomous grasping of abstract objects.",
    present: false,
    start: "July 2013",
    end: "April 2014",
    icon: 5,
    badge: false,
    badgeVariant: null,
    badgeText: null
  },
  {
    company: "Eigen Medical",
    companyLink: "https://www.eigen.com/homepage.shtml?playDEMO=yes",
    position: "Mechanical Engineering Intern",
    location: "Grass Valley, CA",
    description:
      "Two summers of internship during high school where I assembled Eigen's core products and first learned how to 3D design products and have them manufactured.",
    present: false,
    start: "June 2010",
    end: "September 2010 & June 2011 - September 2011",
    icon: 6,
    badge: false,
    badgeVariant: null,
    badgeText: null
  },
  {
    company: "Life",
    companyLink: null,
    position: "Birth & Survival",
    location: "Earth, The Milky Way",
    description: "Where the hell am I?",
    present: false,
    start: "February 3, 1993",
    end: "July 2013",
    icon: 7,
    badge: false,
    badgeVariant: null,
    badgeText: null
  }
];

function App() {
  const [key, setKey] = useState("projects");
  const [showSidebar, setShowSidebar] = useState(false);
  const tabContent = [
    { title: "projects", content: projects },
    { title: "stories", content: writing }
  ];
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

  function onChange(isVisible) {
    setShowSidebar(!isVisible);
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="text-right">
            {!showSidebar && (
              <img
                src={pic}
                width="100"
                height="100"
                alt="Profile_picture"
                style={{
                  verticalAlign: "top",
                  borderRadius: "50%",
                  border: "3px solid black"
                }}
                className="mt-5 box"
              />
            )}
            <Fade in={showSidebar}>
              <Nav
                activeKey={key}
                onSelect={k => setKey(k)}
                className="sticky mr-3"
                style={{ top: "65px", display: "block" }}
              >
                <img
                  src={pic7}
                  width="70"
                  height="112"
                  alt="Logo"
                  className="mb-3 mr-3"
                />
                <Nav.Item className="d-block">
                  <Nav.Link eventKey="projects">projects</Nav.Link>
                </Nav.Item>
                <Nav.Item className="d-block">
                  <Nav.Link eventKey="stories">stories</Nav.Link>
                </Nav.Item>
                <Nav.Item className="d-block">
                  <Nav.Link eventKey="work">work</Nav.Link>
                </Nav.Item>
              </Nav>
            </Fade>
          </Col>
          <Col xs={7}>
            <h1 className="display-2 mt-5">Josh Knapp</h1>
            <VisibilitySensor onChange={onChange} partialVisibility={true}>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={k => setKey(k)}
                className="border-0"
              >
                {tabContent.map((tab, i) => {
                  return (
                    <Tab
                      eventKey={tab.title}
                      title={tab.title}
                      className="pt-4 border-0"
                      key={i}
                    >
                      {tab.content.map(
                        ({ title, tags, description, link, img, date }, i) => {
                          return (
                            <Card
                              className={`mb-4 ${
                                tab.title === "projects" ? "w-50" : ""
                              }`}
                              key={i}
                            >
                              {img && <Card.Img variant="top" src={img} />}
                              <Card.Body>
                                <Card.Title>
                                  {link ? (
                                    <a href={link} target="_blank">
                                      {title}
                                    </a>
                                  ) : (
                                    title
                                  )}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {tags.map((tag, i) => {
                                    return (
                                      <Badge
                                        pill
                                        variant="secondary"
                                        className="mr-1"
                                        key={i}
                                      >
                                        {tag}
                                      </Badge>
                                    );
                                  })}
                                </Card.Subtitle>
                                <Card.Text>{description}</Card.Text>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-muted">
                                  {tab.title === "projects"
                                    ? "Last Updated " + date
                                    : "Published " + date}
                                </small>
                              </Card.Footer>
                            </Card>
                          );
                        }
                      )}
                    </Tab>
                  );
                })}
                <Tab
                  eventKey="work"
                  title="work"
                  className="pt-4 border-0 mb-4"
                >
                  <Alert variant="warning">
                    Click{" "}
                    <Alert.Link href={resume} download="Josh_Knapp_Resume">
                      here
                    </Alert.Link>{" "}
                    for Josh's resume.
                  </Alert>
                  <VerticalTimeline animate={false} layout="1-column">
                    {work.map(
                      (
                        {
                          position,
                          company,
                          companyLink,
                          location,
                          description,
                          start,
                          present,
                          end,
                          icon,
                          badge,
                          badgeText,
                          badgeVariant,
                          people
                        },
                        i
                      ) => {
                        return (
                          <VerticalTimelineElement
                            contentStyle={{
                              background: "rgb(33, 150, 243)",
                              color: "#fff",
                              padding: "0px"
                            }}
                            contentArrowStyle={{
                              borderRight: "7px solid  rgb(33, 150, 243)"
                            }}
                            iconStyle={{ background: "white", color: "white" }}
                            icon={icons[icon]}
                            key={i}
                          >
                            <Card
                              className="text-dark"
                              style={{ borderBottomWidth: "0px" }}
                            >
                              <Card.Body>
                                <Card.Title>
                                  {position}
                                  {badge && (
                                    <Badge
                                      variant={badgeVariant}
                                      className="ml-2"
                                    >
                                      {badgeText}
                                    </Badge>
                                  )}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {companyLink ? (
                                    <a href={companyLink || ""} target="_blank">
                                      {company}
                                    </a>
                                  ) : (
                                    company
                                  )}{" "}
                                  - {location}
                                  <br />
                                </Card.Subtitle>
                                <Card.Text>
                                  {description}
                                  <br />
                                  <Badge
                                    pill
                                    variant="secondary"
                                    className="mt-2 mr-2"
                                  >
                                    HTML
                                  </Badge>
                                  <Badge
                                    pill
                                    variant="secondary"
                                    className="mt-2 mr-2"
                                  >
                                    CSS
                                  </Badge>
                                  <Badge
                                    pill
                                    variant="secondary"
                                    className="mt-2 mr-2"
                                  >
                                    JavaScript
                                  </Badge>
                                  <Badge
                                    pill
                                    variant="secondary"
                                    className="mt-2 mr-2"
                                  >
                                    Bootstrap 4
                                  </Badge>
                                </Card.Text>
                              </Card.Body>
                              {people && (
                                <ListGroup className="list-group-flush">
                                  <ListGroupItem>
                                    {[
                                      "Jon (FE developer)",
                                      "Ryan (BE developer)",
                                      "Roy (FE developer)",
                                      "Mick (Scrum Master)"
                                    ].map((name, i) => {
                                      return (
                                        <OverlayTrigger
                                          key={i}
                                          placement="top"
                                          overlay={
                                            <Tooltip id={`tooltip-${i}`}>
                                              Josh was amazing, just so great.
                                              <br />-{name}
                                            </Tooltip>
                                          }
                                        >
                                          <img
                                            src={pic2}
                                            width="40px"
                                            alt="Co-worker_image"
                                            height="40px"
                                            style={{ borderRadius: "20px" }}
                                            className="mr-2"
                                          />
                                        </OverlayTrigger>
                                      );
                                    })}
                                  </ListGroupItem>
                                </ListGroup>
                              )}
                              <Card.Footer>
                                <small className="text-muted">
                                  {start} {(present || end) && "- "}
                                  {present ? "Present" : end}
                                </small>
                              </Card.Footer>
                            </Card>
                          </VerticalTimelineElement>
                        );
                      }
                    )}
                  </VerticalTimeline>
                </Tab>
              </Tabs>
            </VisibilitySensor>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
