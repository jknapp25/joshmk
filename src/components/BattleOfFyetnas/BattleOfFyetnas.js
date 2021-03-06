import React, { useState, useEffect } from "react";
import moment from "moment";
import { navigate } from "@reach/router";
import {
  Container,
  Image,
  Table,
  Row,
  Col,
  Button,
  Badge,
  Card,
  Form,
  Nav,
  ProgressBar,
  Modal,
  Dropdown,
  Alert,
  InputGroup,
  DropdownButton,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import Calendar from "../Calendar";
import ImageUploader from "../ImageUploader";
import {
  GiMoebiusStar,
  GiSharpAxe,
  GiPocketBow,
  GiThrownKnife,
  GiBlackKnightHelm,
  GiEnergyArrow,
  GiPunchBlast,
} from "react-icons/gi";
import {
  FaTrashAlt,
  FaEllipsisV,
  FaArrowCircleUp,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import { IoIosArrowBack, IoMdCalendar, IoIosPeople } from "react-icons/io";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { Helmet } from "react-helmet";
import battleAxe from "./assets/battle-axe.png";
import emailjs, { init } from "emailjs-com";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import {
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../../graphql/mutations";
import { useIsMounted } from "../../lib/utils";
import useSound from "use-sound";
import { updates } from "./data/_updates.js";
import { training } from "./data/_training.js";
import { warriors } from "./data/_warriors.js";
import { warlords } from "./data/_warlords.js";
import stickerSorcerer from "./assets/stickerSorcerer.png";
import "react-datepicker/dist/react-datepicker.css";
import "./BattleOfFyetnas.css";
export default BattleOfFyetnas;

init("user_YmjT0y9RWFvhcFf32gw1i");

const currentDate = moment();

function BattleOfFyetnas() {
  const [activePage, setActivePage] = useState("Battle");
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showPlannedWorkoutModal, setShowPlannedWorkoutModal] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [commentWorkoutId, setCommentWorkoutId] = useState("");
  const [commentingWarriorName, setCommentingWarriorName] = useState("");
  const [activeComment, setActiveComment] = useState("");
  const [showBattleSummary, setShowBattleSummary] = useState(true);

  //workout stuff
  const [warrior, setWarrior] = useState("");
  const [description, setDescription] = useState("");
  const [joint, setJoint] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  const isMounted = useIsMounted();

  async function addWorkout() {
    setShowWorkoutModal(false);
    clearModals();

    const data = { warrior, description, joint };
    const resp = await API.graphql(
      graphqlOperation(createWorkout, { input: data })
    );

    if (resp) {
      let updWorkouts = JSON.parse(JSON.stringify(workouts));
      updWorkouts.push(resp.data.createWorkout);
      setWorkouts(updWorkouts);

      return resp.data.createWorkout.id;
    }
  }

  async function addPlannedWorkout() {
    setShowPlannedWorkoutModal(false);
    clearModals();

    const data = { warrior, description, joint, plannedStart: dateTime };
    const resp = await API.graphql(
      graphqlOperation(createWorkout, { input: data })
    );

    if (resp) {
      let updWorkouts = JSON.parse(JSON.stringify(workouts));
      updWorkouts.push(resp.data.createWorkout);
      setWorkouts(updWorkouts);
    }
  }

  async function comment() {
    // add new workout
    const data = {
      warrior: commentingWarriorName,
      description: activeComment,
      joint: false,
    };
    const resp = await API.graphql(
      graphqlOperation(createWorkout, { input: data })
    );

    if (resp) {
      const newWorkoutId = resp.data.createWorkout.id;

      // update commentWorkout w/ reply
      let updCommentWorkout = workouts.find(
        (wkt) => wkt.id === commentWorkoutId
      );
      if (updCommentWorkout.replies) {
        updCommentWorkout.replies = [
          ...updCommentWorkout.replies,
          newWorkoutId,
        ];
      } else {
        updCommentWorkout.replies = [newWorkoutId];
      }

      delete updCommentWorkout.createdAt;
      delete updCommentWorkout.updatedAt;

      const respCommentWorkout = await API.graphql(
        graphqlOperation(updateWorkout, { input: updCommentWorkout })
      );

      // add new workout locally
      let updWorkouts = JSON.parse(JSON.stringify(workouts));
      updWorkouts.push(resp.data.createWorkout);

      // update local commentWorkout
      updWorkouts = updWorkouts.map((wkt) => {
        if (wkt.id === commentWorkoutId) {
          return respCommentWorkout.data.updateWorkout;
        }

        return wkt;
      });

      // update workouts locally
      setWorkouts(updWorkouts);

      clearModals();
    }
  }

  async function RSVP(workout, warrName) {
    const updOtherWarriors = workout.otherWarriors
      ? [...workout.otherWarriors, warrName]
      : [warrName];
    const updWorkout = {
      ...workout,
      otherWarriors: updOtherWarriors,
    };
    delete updWorkout.createdAt;
    delete updWorkout.updatedAt;

    const resp = await API.graphql(
      graphqlOperation(updateWorkout, { input: updWorkout })
    );

    if (resp) {
      let updWorkouts = workouts.map((wkt) =>
        wkt.id === updWorkout.id ? updWorkout : wkt
      );
      setWorkouts(updWorkouts);
    }
  }

  function clearModals() {
    setWarrior("");
    setDescription("");
    setCommentWorkoutId("");
    setCommentingWarriorName("");
    setActiveComment("");
    setJoint(false);
    setDateTime("");
  }

  async function deleteWrkout(workoutId) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );

    if (shouldDelete) {
      const resp = await API.graphql(
        graphqlOperation(deleteWorkout, { input: { id: workoutId } })
      );

      if (resp) {
        const updWorkouts = workouts.filter((wkt) => wkt.id !== workoutId);
        setWorkouts(updWorkouts);
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const items = await API.graphql(
        graphqlOperation(queries.listWorkouts, { limit: 1000 })
      );

      const fetchedWorkouts = items.data.listWorkouts.items;
      if (isMounted.current) setWorkouts(fetchedWorkouts);
    }

    fetchData();
  }, [isMounted]);

  const replyIds = workouts.reduce((acc, curr) => {
    if (curr.replies && curr.replies.length > 0) {
      return [...acc, ...curr.replies];
    } else {
      return acc;
    }
  }, []);

  const sortedWorkouts = workouts
    .sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (b.createdAt < a.createdAt) {
        return -1;
      } else {
        return 0;
      }
    })
    .filter((wkt) => !wkt.plannedStart && !replyIds.includes(wkt.id));

  const plannedWorkouts = workouts.filter((wkt) => !!wkt.plannedStart);

  let bgColor = "#e2b065"; // old one e2b065
  if (
    moment(currentDate).isBetween(moment("2021-02-07"), moment("2021-02-14"))
  ) {
    bgColor = "#79919a";
  }
  if (
    moment(currentDate).isBetween(moment("2021-02-14"), moment("2021-02-21"))
  ) {
    bgColor = "#d8d3b8";
  }
  if (
    moment(currentDate).isBetween(moment("2021-02-21"), moment("2021-02-28"))
  ) {
    bgColor = "#4495ac";
  }
  if (
    moment(currentDate).isBetween(moment("2021-02-28"), moment("2021-03-07"))
  ) {
    bgColor = "#6e655f";
  }

  return (
    <Container fluid id="battle" style={{ backgroundColor: bgColor }}>
      <Helmet>
        <title>Battle of Fyetna&#347;</title>
        <link rel="icon" type="image/png" href={battleAxe} sizes="16x16" />
      </Helmet>
      <Col className="px-0">
        <Row>
          <Col xs={12} sm={3} md={3} lg={3} className="p-4 bg-transparent">
            <GiEnergyArrow
              size="2em"
              className="text-dark cursor-pointer"
              title="Back to the homeland"
              style={{ transform: "rotate(165deg)" }}
              onClick={() => navigate("/")}
            />
          </Col>
          <Col
            xs={12}
            sm={6}
            md={6}
            lg={6}
            className="pt-4 hidden-xs bg-transparent"
          >
            <h1 className="mt-3 mb-0" style={{ fontFamily: "MedievalSharp" }}>
              <span>The Battle of Fyetna&#347;</span>{" "}
              <Badge
                style={{
                  lineHeight: "1.4rem",
                  paddingTop: "20px",
                  backgroundColor: "#bd1818",
                  color: "white",
                }}
              >
                Feb 7 - Mar 6
              </Badge>
            </h1>
            <div style={{ transform: "translateY(-10px)" }}>
              <small className="text-dark">
                [Fee-et-noz] Translated Fitness in English
              </small>
            </div>
          </Col>
          <Col
            xs={12}
            sm={3}
            md={3}
            lg={3}
            className="p-4 bg-transparent"
          ></Col>
        </Row>
        {showBattleSummary ? (
          <>
            <Row className="bg-dark">
              <Col
                xs={12}
                sm={3}
                md={3}
                lg={3}
                className="p-4 bg-transparent"
              ></Col>
              <Col
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className="pt-4 bg-transparent text-light"
              >
                <h5>
                  <strong className="font-weight-bold">
                    The Battle has ended.
                  </strong>
                </h5>
                <p>
                  The four evil warlords are no more! Together we pressed into
                  the pain and learned that we <strong>are</strong> capable. And
                  our lives no longer have to be tormented by these things.
                </p>
                <p>Warrior, YOU ARE POWERFUL. You are STRONG. You are FREE!</p>
                <p>
                  It's time to celebrate! Enjoy your day, enjoy your week, enjoy
                  your life, free from fear, loneliness, shame and
                  purposelessness. Revel in it!
                </p>
                <p>
                  I invite you to celebrate with me (Sorcerer Josh) this{" "}
                  <strong className="text-danger">monday night at 7</strong>.
                  Bring your drink of choice, and your stories. We'll have a
                  virtual happy hour (via Zoom) and just unpack the experience
                  for the fun of it.
                </p>
                <p>
                  I sincerely thank you for having the courage to join this
                  adventure. And I hope to see you monday night!
                </p>
              </Col>
              <Col xs={12} sm={3} md={3} lg={3} className="p-4 bg-transparent">
                <VscChromeClose
                  title="close"
                  size="2em"
                  className="text-light cursor-pointer"
                  onClick={() => setShowBattleSummary(false)}
                />
              </Col>
            </Row>
            <Row className="bg-dark">
              <Col lg={3} className="p-4 bg-transparent"></Col>
              <Col lg={3} className="pt-4  bg-transparent text-light">
                <img
                  src={stickerSorcerer}
                  style={{ width: "100%" }}
                  alt="Sorcerer sticker"
                />
              </Col>
              <Col lg={3} className="p-4 bg-transparent text-light">
                <p>
                  Also, to commemorate our success, I have had these emblems
                  commissioned by the finest craftsmen in all the mortal realm.
                </p>
                <p>
                  Using a special spell of adhesion developed by Sorcerer James,
                  they are able to stick to most surfaces!
                </p>
                <p>
                  You will receive one with your respective skill denoted on it,
                  either in the mail or in person.
                </p>
              </Col>
              <Col lg={3} className="p-4 bg-transparent"></Col>
            </Row>
            <Row className="bg-dark mb-3">
              <Col lg={3} className="p-4 bg-transparent"></Col>
              <Col lg={6} className="p-4 bg-transparent text-light">
                <p>
                  If you consider this adventure to have been one of those good
                  things in life, you can show your love and support for future
                  adventures by{" "}
                  <a
                    href="https://www.buymeacoffee.com/joshmk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    buying me a coffee
                  </a>
                  , and/or by sharing a jumping high-five next time we cross
                  paths.
                </p>
                <p className="mb-0">Cheers!</p>
              </Col>
              <Col lg={3} className="p-4 bg-transparent"></Col>
            </Row>
          </>
        ) : null}
        <Row>
          <Col
            xs={12}
            sm={3}
            md={3}
            lg={3}
            className="p-4 bg-transparent"
          ></Col>
          <Col
            xs={12}
            sm={6}
            md={6}
            lg={6}
            className="hidden-xs bg-transparent"
          >
            <Nav
              activeKey={activePage}
              onSelect={(selectedKey) => setActivePage(selectedKey)}
            >
              {["Details", "Battle", "Training", "FAQ"].map((page) => (
                <Nav.Item key={page}>
                  <Nav.Link eventKey={page} className="pl-0">
                    <h4
                      className={`${
                        page === activePage
                          ? "border-bottom border-dark"
                          : "text-dark"
                      }`}
                      style={{ fontFamily: "MedievalSharp" }}
                    >
                      {page}
                    </h4>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col
            xs={12}
            sm={3}
            md={3}
            lg={3}
            className="p-4 bg-transparent"
          ></Col>
        </Row>
        {activePage === "Battle" ? (
          <Row>
            <Col lg={2} className="p-4 bg-transparent"></Col>
            <Col lg={3} className="bg-transparent">
              {warlords.map((warlord, i) => {
                if (
                  moment(currentDate).isBetween(
                    moment(warlord.start),
                    moment(warlord.end)
                  )
                ) {
                  const workoutsDuringTimeframe = sortedWorkouts.filter((wo) =>
                    moment(wo.createdAt).isBetween(
                      moment(warlord.start),
                      moment(warlord.end)
                    )
                  );
                  const totalHits = workoutsDuringTimeframe.reduce(
                    (acc, curr) => {
                      if (!!curr.plannedStart) return acc;
                      if (curr.joint) {
                        return acc + 2;
                      } else {
                        return acc + 1;
                      }
                    },
                    0
                  );
                  const progress =
                    ((warlord.health - totalHits) / warlord.health) * 100;
                  return (
                    <WarlordActive
                      key={warlord.name}
                      warlord={warlord}
                      progress={progress}
                      weekNum={i + 1}
                    />
                  );
                }
                return null;
              })}
              <Table className="text-light bg-dark">
                <tbody>
                  <tr>
                    {warlords.map(
                      (
                        { miniImage, name, description, start, end, defeated },
                        i
                      ) => {
                        const isActive = moment(currentDate).isBetween(
                          moment(start),
                          moment(end)
                        );
                        return (
                          <td
                            key={name}
                            align="center"
                            className="px-0"
                            style={{ borderTop: "0px" }}
                            title={`Week ${i + 1}: ${name}, ${description} ${
                              defeated ? "(Defeated)" : ""
                            }`}
                          >
                            <div
                              style={{
                                width: "4em",
                                height: "4em",
                                borderRadius: "50%",
                                position: "relative",
                                overflow: "hidden",
                                padding: isActive && !defeated ? "3px" : "",
                                border:
                                  isActive && !defeated
                                    ? "2px solid #28a745"
                                    : "",
                              }}
                            >
                              {defeated ? (
                                <VscChromeClose
                                  size="3.5em"
                                  className="text-danger"
                                  style={{
                                    zIndex: 10000000,
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%,-50%)",
                                  }}
                                />
                              ) : null}

                              <Image
                                src={miniImage}
                                roundedCircle
                                style={{
                                  maxWidth: "100%",
                                  width: "auto",
                                  height: "auto",
                                  position: "absolute",
                                  left: "50%",
                                  top: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              />
                            </div>
                          </td>
                        );
                      }
                    )}
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col lg={5} className="bg-transparent">
              <UpdateCard />

              <Calendar
                workouts={sortedWorkouts}
                mini={true}
                showDayNum={false}
              />

              <hr />

              <Dropdown className="mb-2">
                <Dropdown.Toggle
                  size="lg"
                  variant="success"
                  className="btn-block mb-1 border-dark rounded-0 text-dark font-weight-bold"
                  style={{ borderWidth: "2px" }}
                >
                  <GiPunchBlast size="1.5em" /> Attack!{"  "}
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark">
                  <Dropdown.Item
                    href="#"
                    className="text-light"
                    onClick={() => setShowWorkoutModal(true)}
                  >
                    <GiPunchBlast size="1.5em" /> Add workout
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    className="text-light"
                    onClick={() => setShowPlannedWorkoutModal(true)}
                  >
                    <IoMdCalendar size="1.5em" /> Plan a group workout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {!workouts || workouts.length === 0 ? (
                <div>No workouts</div>
              ) : null}
              {plannedWorkouts.map((workout, i) => {
                if (moment(workout.plannedStart).isAfter(moment())) {
                  return (
                    <PlannedWorkout
                      key={i}
                      workout={workout}
                      deleteWkt={deleteWrkout}
                      RSVP={RSVP}
                    />
                  );
                }
              })}
              {sortedWorkouts.map((workout, i) => {
                return (
                  <Workout
                    key={i}
                    workout={workout}
                    deleteWkt={deleteWrkout}
                    setCommentWorkoutId={setCommentWorkoutId}
                    commentWorkoutId={commentWorkoutId}
                    commentingWarriorName={commentingWarriorName}
                    setCommentingWarriorName={setCommentingWarriorName}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    comment={comment}
                    workouts={workouts}
                  />
                );
              })}
            </Col>
            <Col lg={2} className="p-4 bg-transparent"></Col>
          </Row>
        ) : null}
        {activePage === "Training" ? (
          <Row>
            <Col
              xs={12}
              sm={3}
              md={3}
              lg={3}
              className="p-4 bg-transparent"
            ></Col>
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className="hidden-xs bg-transparent"
            >
              <p className="mb-0">
                <strong>Improve your skills, and learn new ones!</strong>
              </p>
              <p>
                To add more workouts, ideas, tips, or anything, just send it
                over to Josh.
              </p>
              {training.map((tr, i) => (
                <Card key={i} className="bg-dark mb-3 text-light">
                  <Card.Body>
                    {tr.details}
                    <p className="mb-0">
                      <small className="text-muted">
                        Type:{" "}
                        <span className="text-light text-capitalize">
                          {tr.type}
                        </span>
                        , Shared by{" "}
                        {tr.warriors.map((warr, i) => (
                          <Name
                            key={warr}
                            warrior={warr}
                            comma={tr.warriors.length - 1 !== i}
                          />
                        ))}
                      </small>
                    </p>
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col
              xs={12}
              sm={3}
              md={3}
              lg={3}
              className="p-4 bg-transparent"
            ></Col>
          </Row>
        ) : null}
        {activePage === "Details" ? (
          <Row>
            <Col
              xs={12}
              sm={3}
              md={3}
              lg={3}
              className="p-4 bg-transparent"
            ></Col>
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className="hidden-xs bg-transparent"
            >
              <>
                <p>
                  Four overseers of the realm of light were ensnared by the evil
                  ones lies and dragged down into darkness where they were
                  tortured for millenia and corrupted beyond repair. He made
                  them warlords and trained them in the dark arts, each with
                  their own specialty.
                </p>

                <div
                  style={{
                    marginLeft: "-100px",
                    marginRight: "-100px",
                    zIndex: 10,
                  }}
                >
                  <Table className="text-light bg-dark">
                    <tbody>
                      <tr>
                        {warlords.map(
                          ({ image, name, description, health }, i) => (
                            <td
                              align="center"
                              className="px-0"
                              style={{ borderTop: "0px" }}
                              key={name}
                            >
                              <Image
                                src={image}
                                roundedCircle
                                style={warlordStyles}
                              />
                              <div className="font-weight-bold">
                                {name}{" "}
                                <Badge
                                  style={{
                                    backgroundColor: "#bd1818",
                                    color: "white",
                                  }}
                                >
                                  {health}H
                                </Badge>
                              </div>
                              <div>{description}</div>
                              <div>
                                <span className="text-muted">Week {i + 1}</span>
                              </div>
                            </td>
                          )
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <p>
                  The warlords have now been released into the realm of
                  Fyetna&#347;, an in-between space where they are wreaking
                  havoc on humanity, hidden under the guise of shapelessness.{" "}
                  <strong>
                    If allowed to continue, the ramifications will be
                    irreparable.
                  </strong>
                </p>
                <div className="my-4" />
                <h3 style={{ fontFamily: "MedievalSharp" }}>The Goal</h3>
                <p>Defeat the 4 warlords of Fyetna&#347;.</p>
                <h3 style={{ fontFamily: "MedievalSharp" }}>How</h3>
                <p>
                  The warlords exist to separate, so they can only be defeated
                  by unity. Each warrior will commit to working out 5 days of
                  the week and together we will defeat the warlords by rising to
                  the fitness challenge for one month (4 weeks).
                </p>
                <p>
                  <strong>
                    Each warlord takes a certain amount of hits to defeat. One
                    workout = one hit.
                  </strong>{" "}
                  Every day that someone does not workout, it will weaken the
                  collective ability to defeat the warlord.
                </p>
                <h3 style={{ fontFamily: "MedievalSharp" }}>When</h3>
                <p>
                  February 7 - March 6{" "}
                  <strong>
                    *last minute enlistments are allowed until Feb 8
                  </strong>
                </p>
                <h3 style={{ fontFamily: "MedievalSharp" }}>Warriors</h3>

                <WarriorTable warriors={warriors} />

                <div className="py-2" />

                <div>
                  Enlisting has closed.{" "}
                  <strong>The battle has commenced!</strong>
                </div>

                <div className="py-3" />
              </>
            </Col>
            <Col
              xs={12}
              sm={3}
              md={3}
              lg={3}
              className="pt-4 hidden-xs bg-transparent"
            ></Col>
          </Row>
        ) : null}
        {activePage === "FAQ" ? (
          <Row>
            <Col
              xs={12}
              sm={3}
              md={3}
              lg={3}
              className="p-4 bg-transparent"
            ></Col>
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className="hidden-xs bg-transparent"
            >
              <FAQ warlords={warlords} />
            </Col>
            <Col
              xs={12}
              sm={3}
              md={3}
              lg={3}
              className="p-4 bg-transparent"
            ></Col>
          </Row>
        ) : null}
        <WorkoutModal
          showWorkoutModal={showWorkoutModal}
          setShowWorkoutModal={setShowWorkoutModal}
          showPlannedWorkoutModal={showPlannedWorkoutModal}
          setShowPlannedWorkoutModal={setShowPlannedWorkoutModal}
          warrior={warrior}
          setWarrior={setWarrior}
          description={description}
          setDescription={setDescription}
          joint={joint}
          setJoint={setJoint}
          clearModals={clearModals}
          addWorkout={addWorkout}
        />
        <PlannedWorkoutModal
          showPlannedWorkoutModal={showPlannedWorkoutModal}
          setShowPlannedWorkoutModal={setShowPlannedWorkoutModal}
          warrior={warrior}
          setWarrior={setWarrior}
          description={description}
          setDescription={setDescription}
          dateTime={dateTime}
          setDateTime={setDateTime}
          clearModals={clearModals}
          addPlannedWorkout={addPlannedWorkout}
        />
      </Col>
    </Container>
  );
}

/**
 * Helper components
 */

const WarriorTable = () => {
  return (
    <Table className="border-bottom border-top border-dark">
      <tbody>
        <tr>
          {Object.keys(warriors)
            .slice(0, 5)
            .map((warrior, i) => (
              <td align="center" className="border-0" key={i}>
                <div style={circular}>
                  <Image
                    src={warriors[warrior].image}
                    roundedCircle
                    style={circularImage}
                    title={warriors[warrior].phoneNumber}
                  />
                </div>
                <div>{warriors[warrior].name}</div>
                <div style={{ lineHeight: "1em", color: "#bd1818" }}>
                  <small>{warriors[warrior].skill}</small>
                </div>
              </td>
            ))}
        </tr>
        <tr>
          {Object.keys(warriors)
            .slice(5, 10)
            .map((warrior, i) => (
              <td align="center" className="border-0" key={i}>
                <div style={circular}>
                  <Image
                    src={warriors[warrior].image}
                    roundedCircle
                    style={circularImage}
                    title={warriors[warrior].phoneNumber}
                  />
                </div>
                <div>{warriors[warrior].name}</div>
                <div style={{ lineHeight: "1em", color: "#bd1818" }}>
                  <small>{warriors[warrior].skill}</small>
                </div>
              </td>
            ))}
        </tr>
        <tr>
          {Object.keys(warriors)
            .slice(10, 15)
            .map((warrior, i) => (
              <td align="center" className="border-0" key={i}>
                <div style={circular}>
                  <Image
                    src={warriors[warrior].image}
                    roundedCircle
                    style={circularImage}
                    title={warriors[warrior].phoneNumber}
                  />
                </div>
                <div>{warriors[warrior].name}</div>
                <div style={{ lineHeight: "1em", color: "#bd1818" }}>
                  <small>{warriors[warrior].skill}</small>
                </div>
              </td>
            ))}
        </tr>
        <tr>
          {Object.keys(warriors)
            .slice(15, 16)
            .map((warrior, i) => (
              <td align="center" className="border-0" key={i}>
                <div style={circular}>
                  <Image
                    src={warriors[warrior].image}
                    roundedCircle
                    style={circularImage}
                    title={warriors[warrior].phoneNumber}
                  />
                </div>
                <div>{warriors[warrior].name}</div>
                <div style={{ lineHeight: "1em", color: "#bd1818" }}>
                  <small>{warriors[warrior].skill}</small>
                </div>
              </td>
            ))}
          <td className="border-0"></td>
          <td className="border-0"></td>
          <td className="border-0"></td>
          <td className="border-0"></td>
        </tr>
      </tbody>
    </Table>
  );
};

const EmergencyAttack = () => {
  return (
    <Row>
      <Col lg={2} className="p-4 bg-transparent"></Col>
      <Col lg={8} className="bg-transparent">
        <Alert className="bg-danger text-light" style={{ borderRadius: "0px" }}>
          <strong className="text-dark">EMERGENCY:</strong> See today's
          update...
        </Alert>
      </Col>
      <Col lg={2} className="p-4 bg-transparent"></Col>
    </Row>
  );
};

const WoundedWarriorAlert = () => {
  return (
    <Row>
      <Col lg={2} className="p-4 bg-transparent"></Col>
      <Col lg={8} className="bg-transparent">
        <Alert className="bg-danger text-light" style={{ borderRadius: "0px" }}>
          <strong className="text-dark">WOUNDED WARRIOR ALERT:</strong> Tuesday
          evening, Sorcerer Nathan injured his knee on the battlefield. He seems
          to be okay, but may need back-up while he recuperates. Please consider
          doing a group workout to aid our brother!
        </Alert>
      </Col>
      <Col lg={2} className="p-4 bg-transparent"></Col>
    </Row>
  );
};

const UpdateCard = () => {
  const [updateIdx, setUpdateIdx] = useState(updates.length - 1);
  const hasUpdateForToday = moment(updates[updateIdx].date).isSame(
    Date.now(),
    "day"
  );
  const [open, setOpen] = useState(hasUpdateForToday);
  const dateFormatted = moment(updates[updateIdx].date).format("dddd, MMMM Do");
  const description = updates[updateIdx].description;

  const increment = () => {
    const updIdx = updateIdx + 1;
    if (updIdx > updates.length - 1) return;
    setUpdateIdx(updIdx);
  };
  const decrement = () => {
    const updIdx = updateIdx - 1;
    if (updIdx < 0) return;
    setUpdateIdx(updIdx);
  };

  const forwardPossible = open && !(updateIdx + 1 > updates.length - 1);
  const backwardPossible = open && !(updateIdx - 1 < 0);

  let title;
  if (hasUpdateForToday) {
    if (open) {
      title = <span className="font-weight-bold">Today's update</span>;
    } else {
      title = <span className="font-weight-bold">View today's update</span>;
    }
  } else {
    if (open) {
      title = (
        <>
          <span className="text-muted">Update for</span>{" "}
          <span className="font-weight-bold">{dateFormatted}</span>
        </>
      );
    } else {
      title = <span className="text-muted">View past updates</span>;
    }
  }

  return (
    <div className="d-flex mb-2" style={{ alignItems: "center" }}>
      {backwardPossible ? (
        <div
          className="text-dark cursor-pointer position-absolute"
          style={{ zIndex: 10000, transform: "translateX(-25px)" }}
          title="View previous update"
        >
          <IoIosArrowBack size="1.5em" onClick={decrement} />
        </div>
      ) : null}
      {forwardPossible ? (
        <div
          className="text-dark cursor-pointer position-absolute"
          style={{
            zIndex: 10000,
            transform: "translateX(10px) scale(-1, 1)",
            right: "0px",
          }}
          title="View next update"
        >
          <IoIosArrowBack size="1.5em" onClick={increment} />
        </div>
      ) : null}
      <Card className="bg-dark text-light w-100">
        <Card.Header className="cursor-pointer" onClick={() => setOpen(!open)}>
          {title}{" "}
          <span className="text-muted">
            {open ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        </Card.Header>
        {open ? (
          <Card.Body className="bg-update-header">{description}</Card.Body>
        ) : null}
      </Card>
    </div>
  );
};

const WarlordPast = ({ warlord }) => {
  const { name, defeated } = warlord;
  return (
    <Card className={`bg-${defeated ? "success" : "danger"} text-light mb-2`}>
      <Card.Body className="mt-2 align-middle text-center p-1">
        <h3>{defeated ? `Defeated ${name}!` : `${name} survived`}</h3>
      </Card.Body>
    </Card>
  );
};
const WarlordActive = ({ warlord, progress, weekNum }) => {
  const { name, description, image, sayings } = warlord;
  const { text: saying, audio } = sayings[moment(currentDate).day()];
  const [play, { stop, isPlaying }] = useSound(audio);

  let progressColor = 0;
  if (66 < progress && progress <= 100) progressColor = "success";
  if (33 < progress && progress <= 66) progressColor = "warning";
  if (0 <= progress && progress <= 33) progressColor = "danger";

  return (
    <>
      <Card className="text-center bg-dark text-light mb-2">
        <div className="position-absolute ml-2 mt-1">
          <small className="float-left text-muted">Week {weekNum}</small>
        </div>
        <Card.Body>
          <h3
            className="mb-0"
            style={{ fontFamily: "MedievalSharp", fontWeight: "bolder" }}
          >
            {name}
          </h3>
          <div className="mb-2">{description}</div>
          {warlord.defeated ? (
            <h2 className="text-success">DEFEATED</h2>
          ) : (
            <>
              <Image
                src={image}
                className="mb-2"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
              <div className="mb-3 mt-1">
                "{saying}"
                {/* {audio ? (
                <GiSpeaker
                  className="ml-1 cursor-pointer"
                  title={`Listen to ${name}`}
                  size="1.75em"
                  style={{ display: "inline", color: "darkgray" }}
                  onClick={() => play()}
                />
              ) : null} */}
              </div>
              <ProgressBar
                animated
                variant={progressColor}
                now={progress}
                label={`${Math.round(progress)}%`}
                style={{ backgroundColor: "#6c757d" }}
              />
              <small>STRENGTH</small>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

const WarlordFuture = ({ warlord, weekNum }) => {
  const { image, name, description } = warlord;
  return (
    <Card className="bg-dark text-light mb-2">
      <div className="position-absolute ml-2 mt-1 d-block">
        <small className="float-left text-muted">Week {weekNum}</small>
      </div>
      <Card.Body className="mt-2 align-middle">
        <Row>
          <Col lg="3" className="pr-0">
            <Image
              src={image}
              roundedCircle
              style={{
                width: "60px",
                height: "60px",
              }}
            />
          </Col>
          <Col lg="9" className="pl-2">
            <h4 className="mb-0">{name}</h4>
            <div className="mb-2">{description}</div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const Name = ({ warrior, comma }) => {
  return (
    <>
      {warriors[warrior].skill === "sorcerer" ? (
        <GiMoebiusStar
          className="mr-1"
          title="sorcerer"
          style={{
            display: "inline",
            color: "#2feca7",
          }}
        />
      ) : null}
      {warriors[warrior].skill === "gladiator" ? (
        <GiSharpAxe
          className="mr-1"
          title="gladiator"
          style={{
            display: "inline",
            color: "#ec6d2f",
          }}
        />
      ) : null}
      {warriors[warrior].skill === "archer" ? (
        <GiPocketBow
          className="mr-1"
          title="archer"
          style={{
            display: "inline",
            color: "#ecdf2f",
          }}
        />
      ) : null}
      {warriors[warrior].skill === "huntress" ? (
        <GiThrownKnife
          className="mr-1"
          title="huntress"
          style={{
            display: "inline",
            color: "#ec2fb9",
          }}
        />
      ) : null}
      {warriors[warrior].skill === "knight" ? (
        <GiBlackKnightHelm
          className="mr-1"
          title="knight"
          style={{
            display: "inline",
            color: "#2f9cec",
          }}
        />
      ) : null}
      <strong className="text-light">{warrior}</strong>
      {comma ? ", " : ""}
    </>
  );
};

const WorkoutModal = ({
  showWorkoutModal,
  setShowWorkoutModal,
  warrior,
  setWarrior,
  description,
  setDescription,
  joint,
  setJoint,
  clearModals,
  addWorkout,
}) => {
  return (
    <Modal show={showWorkoutModal} onHide={() => setShowWorkoutModal(false)}>
      <Modal.Body className="bg-dark text-light pb-0">
        <Form.Label className="mb-0 text-light">Your name</Form.Label>
        <Form.Control
          as="select"
          rows={2}
          name="skill"
          value={warrior}
          onChange={(e) => setWarrior(e.target.value)}
        >
          <option></option>
          {Object.keys(warriors).map((warr) => (
            <option key={warr}>{warr}</option>
          ))}
        </Form.Control>
        <div className="py-2" />
        <Form.Label className="mb-1 text-light">Workout description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          className="bg-dark border-secondary text-light"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="py-2" />
        <Form.Check
          type="checkbox"
          label="Worked out with other warriors"
          checked={joint}
          onChange={() => setJoint(!joint)}
        />
      </Modal.Body>

      <Modal.Footer className="bg-dark border-dark text-light">
        <Button
          variant="secondary"
          onClick={() => {
            setShowWorkoutModal(false);
            clearModals();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          disabled={!warrior || !description}
          onClick={addWorkout}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const PlannedWorkoutModal = ({
  showPlannedWorkoutModal,
  setShowPlannedWorkoutModal,
  warrior,
  setWarrior,
  description,
  setDescription,
  dateTime,
  setDateTime,
  clearModals,
  addPlannedWorkout,
}) => {
  return (
    <Modal
      show={showPlannedWorkoutModal}
      onHide={() => setShowPlannedWorkoutModal(false)}
    >
      <Modal.Body className="bg-dark text-light">
        <Form.Label className="mb-0 text-light">Your name</Form.Label>
        <Form.Control
          as="select"
          rows={2}
          name="skill"
          value={warrior}
          onChange={(e) => setWarrior(e.target.value)}
        >
          <option></option>
          {Object.keys(warriors).map((warr) => (
            <option key={warr}>{warr}</option>
          ))}
        </Form.Control>
        <div className="py-2" />
        <Form.Label className="mb-0 text-light">Workout description</Form.Label>
        <p className="mb-1">
          <small className="text-muted">
            Please include where this workout will be and other helpful details
            for joining
          </small>
        </p>
        <Form.Control
          as="textarea"
          rows={2}
          className="bg-dark border-secondary text-light"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="py-2" />
        <Form.Label className="mb-1 text-light">When</Form.Label>
        <DatePicker
          selected={dateTime}
          onChange={(date) => setDateTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          inline
        />
      </Modal.Body>

      <Modal.Footer className="bg-dark border-dark text-light">
        <Button
          variant="secondary"
          onClick={() => {
            setShowPlannedWorkoutModal(false);
            clearModals();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          disabled={!warrior || !description}
          onClick={addPlannedWorkout}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Workout = ({
  workout,
  deleteWkt,
  setCommentWorkoutId,
  commentWorkoutId,
  commentingWarriorName,
  setCommentingWarriorName,
  comment,
  activeComment,
  setActiveComment,
  workouts,
}) => {
  const { warrior, createdAt, description, joint, id, replies } = workout;
  const [showActions, setShowActions] = useState(false);
  if (!warrior) return null;
  return (
    <Card
      className="bg-dark text-light mb-2"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Card.Body>
        <Row>
          <Col lg="2" className="pr-0">
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={warriors[warrior].image}
                roundedCircle
                style={circularImage}
                title={warriors[warrior].phoneNumber}
              />
            </div>
          </Col>
          <Col lg="8" className="pl-2">
            <div>
              <small className="text-muted">
                <Name key={warrior} warrior={warrior} comma={false} />
                &ensp;
                {moment(createdAt).format("dddd, MMMM Do")}
              </small>
            </div>
            <div>{description}</div>
          </Col>
          <Col lg="2" className="text-right text-success font-weight-bold">
            +{joint ? "2 hits" : "1 hit"}
            {showActions ? (
              <div
                className="position-absolute"
                style={{ bottom: "0px", right: "13px" }}
              >
                <Dropdown className="d-inline">
                  <Dropdown.Toggle className="bg-transparent border-0 pr-0 hide-dropdown-caret">
                    <FaEllipsisV className="text-secondary" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-dark">
                    <Dropdown.Item href="#" onClick={() => deleteWkt(id)}>
                      <FaTrashAlt className="text-danger mr-2" />
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : null}
          </Col>
        </Row>
      </Card.Body>
      {replies && replies.length > 0 ? (
        <ListGroup variant="flush" className="text-light">
          {replies.map((replyId) => {
            const replyWkt = workouts.find((wkt) => wkt.id === replyId);
            if (replyWkt) {
              return (
                <ListGroup.Item
                  key={replyId}
                  className="text-light"
                  style={{ backgroundColor: "#41474c" }}
                >
                  <div>
                    <small className="text-muted">
                      <Name
                        key={replyWkt.warrior}
                        warrior={replyWkt.warrior}
                        comma={false}
                      />
                      &ensp;
                      {moment(replyWkt.createdAt).format("dddd, MMMM Do")}
                    </small>
                  </div>
                  <div>{replyWkt.description}</div>
                </ListGroup.Item>
              );
            }
            return null;
          })}
        </ListGroup>
      ) : null}
      <Card.Footer
        className={`${
          commentWorkoutId && commentWorkoutId === id ? "p-0" : "py-0"
        } text-muted cursor-pointer bg-update-header`}
        onClick={() => setCommentWorkoutId(id)}
      >
        {!commentWorkoutId || (commentWorkoutId && commentWorkoutId !== id) ? (
          <small>
            <MdSubdirectoryArrowRight
              className="mr-1"
              style={{ verticalAlign: "text-top" }}
            />
            Comment
          </small>
        ) : null}
        {commentWorkoutId && commentWorkoutId === id ? (
          <InputGroup size="sm" className="border-0">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="link"
              title={commentingWarriorName || "Select name"}
              id="input-group-dropdown-1"
              className="border-left-0 border-top-0 border-bottom-0"
              style={{ borderRight: "1px solid rgba(0,0,0,.125)" }}
            >
              {Object.keys(warriors).map((warr) => (
                <Dropdown.Item
                  key={warriors[warr].name}
                  className="text-light bg-dark"
                  href="#"
                  onClick={() => setCommentingWarriorName(warriors[warr].name)}
                >
                  {warriors[warr].name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <FormControl
              disabled={!commentingWarriorName}
              placeholder="Type..."
              className="border-0"
              value={activeComment}
              onChange={(e) => setActiveComment(e.target.value)}
            />
            <InputGroup.Append
              className="bg-transparent border-0"
              onClick={() => {
                if (commentWorkoutId && activeComment) comment();
              }}
            >
              <InputGroup.Text className="bg-transparent border-0">
                <FaArrowCircleUp
                  className={
                    commentWorkoutId && activeComment
                      ? "text-primary"
                      : "text-muted"
                  }
                  size="1.5em"
                />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        ) : null}
      </Card.Footer>
    </Card>
  );
};

const PlannedWorkout = ({ workout, deleteWkt, RSVP }) => {
  const { warrior, description, id, plannedStart, otherWarriors } = workout;
  const [showActions, setShowActions] = useState(false);
  if (!warrior || !plannedStart) return null;
  return (
    <Card
      className="bg-dark text-light mb-2"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Card.Body>
        <Row>
          <Col lg="10">
            <h5>
              <IoIosPeople
                size="2em"
                className="mr-2"
                style={{ color: "rgb(47, 236, 167)" }}
              />
              Group workout {moment(plannedStart).fromNow()}!
            </h5>
            <p className="mt-2 mb-1">{description}</p>
            <div>
              <small className="text-muted">
                When:{" "}
                <strong className="text-light">
                  {moment(plannedStart).format("dddd, MMMM Do, h:mm a")}
                </strong>
              </small>
            </div>
            <div className="mb-2">
              <small className="text-muted">
                Host: <Name key={warrior} warrior={warrior} comma={false} />{" "}
                &bull;{" "}
                {otherWarriors && otherWarriors.length > 0 ? (
                  <>
                    Joining:{" "}
                    {otherWarriors.map((warr, i) => (
                      <Name
                        key={warr}
                        warrior={warr}
                        comma={otherWarriors.length - 1 !== i}
                      />
                    ))}
                  </>
                ) : null}
              </small>
            </div>

            <div>
              <Dropdown>
                <Dropdown.Toggle>RSVP</Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark text-light">
                  <Dropdown.Item className="text-muted" disabled href="#">
                    Select your name...
                  </Dropdown.Item>
                  {Object.keys(warriors).map((warr) => (
                    <Dropdown.Item
                      key={warriors[warr].name}
                      className="text-light"
                      href="#"
                      onClick={() => RSVP(workout, warriors[warr].name)}
                    >
                      {warriors[warr].name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          <Col lg="2" className="text-right text-success font-weight-bold">
            {showActions ? (
              <Dropdown
                className="position-absolute"
                style={{ bottom: "0px", right: "13px" }}
              >
                <Dropdown.Toggle className="bg-transparent border-0 pr-0 hide-dropdown-caret">
                  <FaEllipsisV className="text-secondary" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark">
                  <Dropdown.Item href="#" onClick={() => deleteWkt(id)}>
                    <FaTrashAlt className="text-danger mr-2" />
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const FAQ = () => {
  return (
    <>
      <p>
        <strong>What was the original motivation behind this?</strong>
      </p>
      <p>
        It was clear that many people in my circles (Josh) are desiring to be
        healthier and put in place workout habits. I'm hoping that a month of 5+
        workouts a week, and some peer accountability will help kick-off this
        habit for people.
      </p>
      <p>
        <strong>How many hits does it take to kill a warlord?</strong>
      </p>
      <ul>
        {warlords.map(({ name, health }) => (
          <li key={name}>
            {name}: {health}
          </li>
        ))}
      </ul>
      <p>
        <strong>Does my goal have to be 5 days of the week?</strong>
      </p>
      <p>
        Yes. That is how a reasonable number of required hits is determined to
        defeat each warlord.
      </p>
      <p>
        <strong>How will we keep track of our progress?</strong>
      </p>
      <p>
        Each warrior will visit this page daily to check off that they completed
        their workout. Future battles will include integrations with apps like
        Strava and Nike+ for automated logging.
      </p>
      <p>
        <strong>What kind of workouts can I do?</strong>
      </p>
      <p>Any kind you want!</p>
      <p>
        <strong>Are joint workouts worth more?</strong>
      </p>
      <p>
        Yes, joint workouts will earn 2 hits per person that attended. For
        example: 3 people ran together = 3 * 2 = 6 hits.
      </p>
      <p>
        <strong>
          Do I have to input my progress on the desktop version of this page?
        </strong>
      </p>
      <p>
        Yes, for now. Josh is also working on a mobile version of this page, but
        it's unclear when that will be ready.
      </p>
      <p>
        <strong>What happens if we fall behind?</strong>
      </p>
      <p>
        If you are not able to do a workout, this needs to be communicated to
        the others so that they can do joint workouts to recuperate hits. If you
        hover over people's avatars, you will see their phone number.
      </p>
      <p>
        <strong>
          Do joint workouts count for 2 hits if they are done with someone that
          is not in the warriors list?
        </strong>
      </p>
      <p>No, just 1 hit</p>
      <p>
        <strong>
          If I do more than one workout in a day, can I count all of them?
        </strong>
      </p>
      <p>
        No, just one workout will count for that day. If that was allowed, one
        person could do 5 workouts in a day and it would defeat the purpose of
        collaboration.
      </p>
      <p>
        <strong>What features are Josh working on?</strong>
      </p>
      <ul>
        <li>Update a workout</li>
        <li>Add one joint workout for multiple warriors</li>
        <li>Mini calendar - better tracking of team progress</li>
        <li>
          Request back-up - in case you are going to miss a workout for the week
        </li>
      </ul>
    </>
  );
};

const EnlistForm = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pwc7pql",
        "template_b21nihq",
        e.target,
        "user_YmjT0y9RWFvhcFf32gw1i"
      )
      .then(
        () => setSubmitSuccess(true),
        (error) => {
          alert(
            "Could not send your submission. Please make sure your avatar is smaller than 500kb. If the issue continues, call/text Josh at 541-368-8091."
          );
          console.log(error.text);
        }
      );
  }

  return submitSuccess ? (
    <div
      className="p-3 text-center"
      style={{ backgroundColor: "green", color: "white" }}
    >
      <h1 style={{ fontFamily: "MedievalSharp" }}>You have enlisted!</h1>
      <p className="mb-0">You will be added to the warriors list today.</p>
    </div>
  ) : (
    <Form id="enlist-form" onSubmit={sendEmail}>
      <Card
        style={{
          backgroundColor: "#212529",
          border: "4px solid #bd1818",
        }}
      >
        <Card.Body>
          <Form.Label className="mb-1 text-light">Name</Form.Label>
          <Form.Control type="text" name="name" />
          <div className="py-2" />
          <Form.Label className="mb-1 text-light">Phone Number</Form.Label>
          <Form.Control type="text" name="phone" />
          <div className="py-2" />
          <Form.Label className="mb-0 text-light">Primary Skill</Form.Label>
          <small className="text-muted d-block mb-2">Select a skill...</small>
          <Form.Control as="select" name="skill">
            <option></option>
            <option>Archer (runner)</option>
            <option>Knight (bicyclist)</option>
            <option>Gladiator (weights/calisthenics)</option>
            <option>Sorcerer (multiple)</option>
          </Form.Control>
          <div className="py-2" />
          <Form.Label className="mb-0 text-light">Avatar</Form.Label>
          <small className="text-muted d-block mb-2">
            Max image size: 500kb
          </small>
          <ImageUploader
            images={[]}
            afterEdit={() => {}}
            fieldId="avatar"
            fieldName="avatar_attachment"
            fieldLabel="Avatar"
            multiple={false}
            imageDisplayName="avatar"
            fileSizeLimit={0.5}
          />
          <div className="py-1" />
          <Form.Label className="text-light mb-0">Address</Form.Label>
          <small className="text-muted d-block mb-2">
            For a small victory gift
          </small>
          <Form.Control type="text" className="mb-2" name="address" />
        </Card.Body>
        <Card.Footer className="p-0">
          <Button
            size="lg"
            className="submit-btn"
            block
            style={{
              borderRadius: "0px",
              backgroundColor: "#bd1818",
              borderColor: "#bd1818",
            }}
            type="submit"
          >
            <h1 className="pt-2" style={{ fontFamily: "MedievalSharp" }}>
              Join the Battle
            </h1>
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  );
};

/**
 * Data
 */

const warlordStyles = { width: "180px", height: "180px" };
const circular = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  position: "relative",
  overflow: "hidden",
};
const circularImage = {
  maxWidth: "100%",
  width: "auto",
  height: "auto",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};
