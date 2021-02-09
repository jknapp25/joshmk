import React, { useState, useEffect } from "react";
import moment from "moment";
import {
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
} from "react-bootstrap";
import Calendar from "./Calendar";
import ImageUploader from "./ImageUploader";
import {
  GiMoebiusStar,
  GiSharpAxe,
  GiPocketBow,
  GiThrownKnife,
} from "react-icons/gi";
import { FaTrashAlt } from "react-icons/fa";
import warlord1 from "../assets/warlord1.jpg";
import warlord2 from "../assets/warlord2.jpg";
import warlord3 from "../assets/warlord3.jpg";
import warlord4 from "../assets/warlord4.jpg";
import josh from "../assets/josh4.jpg";
import riah from "../assets/riah.jpg";
import ben from "../assets/ben.jpg";
import taylor from "../assets/tay.jpg";
import natalie from "../assets/natalie.jpg";
import garrett from "../assets/garrett.jpg";
import lilly from "../assets/lilly.jpg";
import nathan from "../assets/nathan2.jpg";
import james from "../assets/james.jpg";
import simon from "../assets/simon.jpg";
import caleb from "../assets/caleb.jpg";
import isaac from "../assets/isaac.png";
import dave from "../assets/dave.jpg";
import emailjs, { init } from "emailjs-com";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { createWorkout, deleteWorkout } from "../graphql/mutations";
import { useIsMounted } from "../lib/utils";
import "./BattleOfFyetnas.css";
export default BattleOfFyetnas;

init("user_YmjT0y9RWFvhcFf32gw1i");

const currentDate = moment();

/* <Card className="bg-dark text-light mb-3">
    <Card.Body>
      <p>
        Day on, the warrior launched a surprise attack, leaving Vilkyu off-guard.
        Many hits were dealt, including two powerful blows in which Garrett and Lilly combined their skills of sorcery together. 
        The brave Riah and Natalie performed
        reconnaissance on Sunday that has provided the group with
        useful information. They released one of Natalie's highly
        trained hawks into the realm of Fyetnas. Garrett was able to
        open a portal into the realm for the hawk to pass through
        and using Riah's skills in sorcery they were able to cloak
        the hawk with invisibility. They discovered that Vilkyu is
        highly skilled in the art of isolation and is planning on
        using that tactic to influence the warrriors.
      </p>
      <p>
        Ben has advised to stay cautious and use your communication
        windows to connect with others if feelings of isolation
        start to creep in.
      </p>
    </Card.Body>
  </Card> */

function BattleOfFyetnas() {
  const [activePage, setActivePage] = useState("Battle");
  const [show, setShow] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  //workout stuff
  const [warrior, setWarrior] = useState("");
  const [description, setDescription] = useState("");
  const [joint, setJoint] = useState(false);

  const isMounted = useIsMounted();

  async function addWorkout() {
    setShow(false);

    const data = { warrior, description, joint };
    await API.graphql(graphqlOperation(createWorkout, { input: data }));
  }

  async function deleteWrkout(workoutId) {
    console.log(workoutId);
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );

    if (shouldDelete) {
      await API.graphql(
        graphqlOperation(deleteWorkout, { input: { id: workoutId } })
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      const items = await API.graphql({ query: queries.listWorkouts });

      const fetchedWorkouts = items.data.listWorkouts.items;
      if (isMounted.current) setWorkouts(fetchedWorkouts);
    }

    fetchData();
  }, [isMounted]);

  const sortedWorkouts = workouts.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else if (b.createdAt < a.createdAt) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <Col className="px-0">
      <Row style={{ backgroundColor: "#e2b065" }}>
        <Col xs={12} sm={3} md={3} lg={3} className="p-4 bg-transparent"></Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
          className="pt-4 hidden-xs bg-transparent"
        >
          <h1 className="mt-3 mb-0" style={{ fontFamily: "MedievalSharp" }}>
            <span>The Battle of Fyetna&#347;</span>{" "}
            <Badge variant="success">Active</Badge>
          </h1>
          <div style={{ transform: "translateY(-10px)" }}>
            <small className="text-muted">
              [Fee-et-noz] Translated Fitness in English
            </small>
          </div>
          <div className="my-2" />
          <Nav
            activeKey={activePage}
            onSelect={(selectedKey) => setActivePage(selectedKey)}
          >
            {["Details", "Battle", "FAQ"].map((page) => (
              <Nav.Item key={page}>
                <Nav.Link eventKey={page} className="pl-0">
                  <h4
                    className={`${
                      page === activePage ? "border-bottom border-dark" : ""
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
        <Col xs={12} sm={3} md={3} lg={3} className="p-4 bg-transparent"></Col>
      </Row>
      {activePage === "Battle" ? (
        <>
          <Row style={{ backgroundColor: "#e2b065" }}>
            <Col lg={2} className="p-4 bg-transparent"></Col>
            <Col lg={3} className="bg-transparent">
              {warlords.map((warlord, i) => {
                if (
                  moment(currentDate).isBetween(
                    moment(warlord.start),
                    moment(warlord.end)
                  )
                ) {
                  const workoutsDuringTimeframe = workouts.filter((wo) =>
                    moment(wo.createdAt).isBetween(
                      moment(warlord.start),
                      moment(warlord.end)
                    )
                  );
                  const totalHits = workoutsDuringTimeframe.reduce(
                    (acc, curr) => {
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
                } else {
                  if (moment(currentDate).isAfter(moment(warlord.end))) {
                    return <WarlordPast key={warlord.name} warlord={warlord} />;
                  }

                  return (
                    <WarlordFuture
                      key={warlord.name}
                      warlord={warlord}
                      weekNum={i + 1}
                    />
                  );
                }
              })}
            </Col>
            <Col lg={5} className="bg-transparent">
              {/* <Calendar /> */}
              <Card className="bg-dark text-light mb-3">
                <Card.Body>
                  <p>
                    Day one, the warriors launched a surprise attack, taking
                    Vilkyu off-guard. Many hits were dealt, including one highly
                    effective blow in which sorcerers Garrett and Lilly combined
                    their powers and obliterated his active spell working to
                    convince the warriors that no one cares.
                  </p>
                  <p className="mb-0">An epic start to a crucial battle!</p>
                </Card.Body>
              </Card>
              <div className="d-block mb-4">
                <h5 className="d-inline">Activity</h5>
                <Button
                  variant="success"
                  className="float-right"
                  onClick={() => setShow(true)}
                >
                  Add workout
                </Button>
              </div>
              {!workouts || workouts.length === 0 ? (
                <div>No workouts</div>
              ) : null}
              {sortedWorkouts.map((workout, i) => (
                <Workout key={i} workout={workout} deleteWkt={deleteWrkout} />
              ))}
            </Col>
            <Col lg={2} className="p-4 bg-transparent"></Col>
          </Row>
        </>
      ) : null}
      {activePage === "Details" ? (
        <Row style={{ backgroundColor: "#e2b065" }}>
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
                tortured for millenia and corrupted beyond repair. He made them
                warlords and trained them in the dark arts, each with their own
                specialty.
              </p>

              <div
                style={{
                  marginLeft: "-100px",
                  marginRight: "-100px",
                  zIndex: 10,
                }}
              >
                <Table style={{ backgroundColor: "#212529", color: "white" }}>
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
                Fyetna&#347;, an in-between space where they are wreaking havoc
                on humanity, hidden under the guise of shapelessness.{" "}
                <strong>
                  If allowed to continue, the ramifications will be irreparable.
                </strong>
              </p>
              <div className="my-4" />
              <h3 style={{ fontFamily: "MedievalSharp" }}>The Goal</h3>
              <p>Defeat the 4 warlords of Fyetna&#347;.</p>
              <h3 style={{ fontFamily: "MedievalSharp" }}>How</h3>
              <p>
                The warlords exist to separate, so they can only be defeated by
                unity. Each warrior will commit to working out 5 days of the
                week and together we will defeat the warlords by rising to the
                fitness challenge for one month (4 weeks).
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

              <EnlistForm />

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
        <Row style={{ backgroundColor: "#e2b065" }}>
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
      <Modal show={show} onHide={() => setShow(false)}>
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
          <Form.Label className="mb-1 text-light">
            Workout description
          </Form.Label>
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
          <div className="py-2" />
          <span>*NOTE - Max: 1 workout/day, 5 workouts/wk</span>
        </Modal.Body>

        <Modal.Footer className="bg-dark border-dark text-light">
          <span className="mr-2">Refresh after saving</span>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={addWorkout}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
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
            .slice(10, 13)
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
        </tr>
      </tbody>
    </Table>
  );
};

const WarlordPast = ({ warlord }) => {
  const { name, defeated } = warlord;
  return (
    <Card className={`bg-${defeated ? "success" : "danger"} text-light mb-2`}>
      <Card.Body className="mt-2 align-middle text-center p-1">
        <h3>{defeated ? `Defeated ${name}` : `${name} survived`}</h3>
      </Card.Body>
    </Card>
  );
};
const WarlordActive = ({ warlord, progress, weekNum }) => {
  const { name, description, image, sayings } = warlord;
  const saying = sayings[moment(currentDate).day()];
  return (
    <Card className="text-center bg-dark text-light mb-2">
      <div className="position-absolute ml-2 mt-1">
        <small className="float-left text-muted">Week {weekNum}</small>
      </div>
      <Card.Body>
        <h4 className="mb-0">{name}</h4>
        <div className="mb-2">{description}</div>
        <Image
          src={image}
          roundedCircle
          style={{
            width: "260px",
            height: "260px",
          }}
        />
        <div className="mb-3">"{saying}"</div>
        <ProgressBar now={progress} />
        <small>STRENGTH</small>
      </Card.Body>
    </Card>
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

const Workout = ({ workout, deleteWkt }) => {
  const { warrior, createdAt, description, joint, id } = workout;
  const [showActions, setShowActions] = useState(false);
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
              <small className="text-muted">
                <strong className="text-light">{warrior}</strong>
                &ensp;
                {moment(createdAt).format("dddd, MMMM Do")}
              </small>
            </div>
            <div>{description}</div>
          </Col>
          <Col lg="2" className="text-right text-success font-weight-bold">
            +{joint ? "2 hits" : "1 hit"}
            {showActions ? (
              <FaTrashAlt
                className="text-danger cursor-pointer mt-auto position-absolute"
                style={{ bottom: "0px", right: "13px" }}
                onClick={() => deleteWkt(id)}
              />
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
        <li>Delete a workout</li>
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

const warriors = {
  "Riah Knapp": {
    name: "Riah Knapp",
    skill: "sorcerer",
    image: riah,
    phoneNumber: "+1 541-231-8973",
  },
  "Ben Tissell": {
    name: "Ben Tissell",
    skill: "archer",
    image: ben,
    phoneNumber: "+1 503-307-6484",
  },
  "Josh Knapp": {
    name: "Josh Knapp",
    skill: "sorcerer",
    image: josh,
    phoneNumber: "+1 541-368-8091",
  },
  "Taylor Rassi": {
    name: "Taylor Rassi",
    skill: "gladiator",
    image: taylor,
    phoneNumber: "+1 503-593-8657",
  },
  Natalie: {
    name: "Natalie",
    skill: "huntress",
    image: natalie,
    phoneNumber: "+1 541-760-9656",
  },
  "Garrett Tams": {
    name: "Garrett Tams",
    skill: "sorcerer",
    image: garrett,
    phoneNumber: "+1 775-830-2345",
  },
  "Lilly Tams": {
    name: "Lilly Tams",
    skill: "sorcerer",
    image: lilly,
    phoneNumber: "+1 503-544-6116",
  },
  "Nathan A Walker": {
    name: "Nathan A Walker",
    skill: "sorcerer",
    image: nathan,
    phoneNumber: "+1 503-914-8148",
  },
  "James Sheu": {
    name: "James Sheu",
    skill: "sorcerer",
    image: james,
    phoneNumber: "+1 559-283-3584",
  },
  "Simon Bardone": {
    name: "Simon Bardone",
    skill: "gladiator",
    image: simon,
    phoneNumber: "+1 559-283-3584",
  },
  "Caleb Werntz": {
    name: "Caleb Werntz",
    skill: "gladiator",
    image: caleb,
    phoneNumber: "+1 603-852-1248",
  },
  "Isaac Bardone": {
    name: "Isaac Bardone",
    skill: "gladiator",
    image: isaac,
    phoneNumber: "+1 559-679-9662",
  },
  "Dave Scriven": {
    name: "Dave Scriven",
    skill: "knight",
    image: dave,
    phoneNumber: "+1 503-880-2734",
  },
};

const warlords = [
  {
    name: "Vilkyu",
    health: 54,
    description: "demon of loneliness",
    image: warlord1,
    start: "2021-02-07",
    end: "2021-02-13",
    sayings: [
      "No one really cares!",
      "You don't need anyone else",
      "Everyone else is happy",
      "You're the only one who feels that way",
      "What's wrong with you?",
      "You deserve to be alone",
      "No one can give you what you need",
    ],
    defeated: false,
  },
  {
    name: "Muldur",
    health: 57,
    description: "demon of shame",
    image: warlord2,
    start: "2021-02-14",
    end: "2021-02-20",
    sayings: ["You'll never have the body you want", "Self-care is selfish!"],
    defeated: false,
  },
  {
    name: "Ziir",
    health: 60,
    description: "demon of purposelessness",
    image: warlord3,
    start: "2021-02-21",
    end: "2021-02-27",
    sayings: [
      "What's the point of all this?!",
      "Doing things for yourself takes away time for socializing",
    ],
    defeated: false,
  },
  {
    name: "Bradock",
    health: 63,
    description: "demon of fear",
    image: warlord4,
    start: "2021-02-28",
    end: "2021-03-06",
    sayings: [
      "What if you get hurt?",
      "Doing things for yourself takes away time for socializing",
    ],
    defeated: false,
  },
];
