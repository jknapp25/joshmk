import React, { useState } from "react";
import {
  Image,
  Table,
  Row,
  Col,
  Button,
  Badge,
  Accordion,
  Card,
  Form,
} from "react-bootstrap";
import ImageUploader from "./ImageUploader";
import warlord1 from "../assets/warlord1.jpg";
import warlord2 from "../assets/warlord2.jpg";
import warlord3 from "../assets/warlord3.jpg";
import warlord4 from "../assets/warlord4.jpg";
import josh from "../assets/josh.jpg";
import riah from "../assets/riah.jpg";
import ben from "../assets/ben.jpg";
import taylor from "../assets/taylor.jpg";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import emailjs, { init } from "emailjs-com";
import "./BattleOfFyetnas.css";
export default BattleOfFyetnas;

init("user_YmjT0y9RWFvhcFf32gw1i");

const warlordStyles = { width: "180px", height: "180px" };
const warriorStyles = { width: "80px", height: "80px" };

const warriors = [
  {
    name: "Riah Knapp",
    skill: "sorcerer",
    image: riah,
    phoneNumber: "+1 541-231-8973",
  },
  {
    name: "Josh Knapp",
    skill: "sorcerer",
    image: josh,
    phoneNumber: "+1 541-368-8091",
  },
  {
    name: "Ben Tissell",
    skill: "archer",
    image: ben,
    phoneNumber: "+1 503-307-6484",
  },
  {
    name: "Taylor Rassi",
    skill: "gladiator",
    image: taylor,
    phoneNumber: "+1 503-593-8657",
  },
];
const warlords = [
  {
    name: "Vilkyu",
    health: 60,
    description: "demon of loneliness",
    image: warlord1,
  },
  {
    name: "Muldur",
    health: 65,
    description: "demon of shame",
    image: warlord2,
  },
  {
    name: "Ziir",
    health: 70,
    description: "demon of purposelessness",
    image: warlord3,
  },
  {
    name: "Bradock",
    health: 75,
    description: "demon of fear",
    image: warlord4,
  },
];

const totalWarriors = 15;

function BattleOfFyetnas() {
  const [faqOpen, setFaqOpen] = useState(false);
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
            <span style={{ textDecoration: "underline 3px solid black" }}>
              The Battle of Fyetna&#347;
            </span>{" "}
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
          <small className="text-muted">
            [Fee-et-noz] Translated Fitness in English
          </small>
          <div className="my-3" />
          <p>
            Four overseers of the realm of light were ensnared by the evil ones
            lies and dragged down into darkness where they were tortured for
            millenia and corrupted beyond repair. He made them warlords and
            trained them in the dark arts, each with their own specialty.
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
                  {warlords.map(({ image, name, description, health }, i) => (
                    <td
                      align="center"
                      className="px-0"
                      style={{ borderTop: "0px" }}
                    >
                      <Image src={image} roundedCircle style={warlordStyles} />
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
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
          <p>
            The warlords have now been released into the realm of Fyetna&#347;,
            an in-between space where they are wreaking havoc on humanity,
            hidden under the guise of shapelessness.{" "}
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
            unity. Each warrior will commit to working out 5 days of the week
            and together we will defeat the warlords by rising to the fitness
            challenge for one month (4 weeks).
          </p>
          <p>
            <strong>
              Each warlord takes a certain amount of hits to defeat. One workout
              = one hit.
            </strong>{" "}
            Every day that someone does not workout, it will weaken the
            collective ability to defeat the warlord.
          </p>
          <h3 style={{ fontFamily: "MedievalSharp" }}>
            Warriors:{"  "}
            {totalWarriors - warriors.length} needed
          </h3>
          <Table className="border-bottom border-top border-dark">
            <tbody>
              <tr>
                {warriors.map(({ image, name, skill }) => (
                  <td align="center" className="border-0">
                    <Image src={image} roundedCircle style={warriorStyles} />
                    <div>{name}</div>
                    <div style={{ lineHeight: "1em", color: "#bd1818" }}>
                      <small>{skill}</small>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
          <div className="py-1" />
          <Accordion activeKey={faqOpen ? "0" : undefined}>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              className="pl-0 pb-0 text-dark text-decoration-none"
              onClick={() => setFaqOpen(!faqOpen)}
            >
              <h3 style={{ fontFamily: "MedievalSharp" }}>
                FAQ{" "}
                {faqOpen ? (
                  <FaCaretUp
                    size=".8em"
                    style={{
                      display: "inline",
                    }}
                  />
                ) : (
                  <FaCaretDown
                    size=".8em"
                    style={{
                      display: "inline",
                    }}
                  />
                )}
              </h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <>
                <p>
                  <strong>What was the original motivation behind this?</strong>
                </p>
                <p>
                  It was clear that many people in my circles (Josh) are
                  desiring to be healthier and put in place a consistent workout
                  habit. I'm hoping that a month of 5+ workouts a week, and some
                  peer accountability will help kick-off this habit for people.
                </p>
                <p>
                  <strong>How many hits does it take to kill a warlord?</strong>
                </p>
                <ul>
                  <li>Vilkyu: 60</li>
                  <li>Muldur: 65</li>
                  <li>Ziir: 70</li>
                  <li>Bradock: 75</li>
                </ul>
                <p>
                  <strong>How many warriors will enlist?</strong>
                </p>
                <p>15 maximum</p>
                <p>
                  <strong>Does my goal have to be 5 days of the week?</strong>
                </p>
                <p>
                  Yes. That is how a reasonable number of required hits is
                  determined to defeat each warlord.
                </p>
                <p>
                  <strong>How will we keep track of our progress?</strong>
                </p>
                <p>
                  Each warrior will visit this page daily to check off that they
                  completed their workout. Future battles will include
                  integrations with apps like Strava and Nike+ for automated
                  logging.
                </p>
                <p>
                  <strong>What kind of workouts can I do?</strong>
                </p>
                <p>Any kind you want!</p>
                <p>
                  <strong>Are joint workouts worth more?</strong>
                </p>
                <p>
                  Yes, joint workouts will earn 2 hits per person that attended.
                  For example: 3 people ran together = 3 * 2 = 6 hits.
                </p>
                <p>
                  <strong>
                    Do I have to input my progress on the desktop version of
                    this page?
                  </strong>
                </p>
                <p>
                  Yes, for now. Josh is also working on a mobile version of this
                  page, but it's unclear when that will be ready.
                </p>
                <p>
                  <strong>What happens if we fall behind?</strong>
                </p>
                <p>
                  If you are not able to do a workout, this needs to be
                  communicated to the others so that they can do joint workouts
                  to recuperate hits.
                </p>
              </>
            </Accordion.Collapse>
          </Accordion>
          <div className="py-2" />

          {submitSuccess ? (
            <div
              className="p-3 text-center"
              style={{ backgroundColor: "green", color: "white" }}
            >
              <h1 style={{ fontFamily: "MedievalSharp" }}>
                You have enlisted!
              </h1>
              <p className="mb-0">
                You will be added to the warriors list today.
              </p>
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
                  <Form.Label className="mb-1 text-light">
                    Phone Number
                  </Form.Label>
                  <Form.Control type="text" name="phone" />
                  <div className="py-2" />
                  <Form.Label className="mb-0 text-light">
                    Primary Skill
                  </Form.Label>
                  <small className="text-muted d-block mb-2">
                    Select a skill...
                  </small>
                  <Form.Control as="select" name="skill">
                    <option></option>
                    <option>Archer (runner)</option>
                    <option>Knight (bicyclist)</option>
                    <option>Gladiator (weight-lifter)</option>
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
                    <h1
                      className="pt-2"
                      style={{ fontFamily: "MedievalSharp" }}
                    >
                      Join the Battle
                    </h1>
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          )}
          <div className="py-3" />
        </Col>
        <Col
          xs={12}
          sm={3}
          md={3}
          lg={3}
          className="pt-4 hidden-xs bg-transparent"
        ></Col>
      </Row>
    </Col>
  );
}
