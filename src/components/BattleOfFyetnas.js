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
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import emailjs, { init } from "emailjs-com";
import "./BattleOfFyetnas.css";
export default BattleOfFyetnas;

init("user_YmjT0y9RWFvhcFf32gw1i");

const warlordStyles = { width: "180px", height: "180px" };
const peopleStyles = { width: "80px", height: "80px" };

const warriors = [
  { name: "Riah Knapp", skill: "sorcerer", image: riah },
  { name: "Josh Knapp", skill: "sorcerer", image: josh },
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
        (result) => {
          console.log(result.text);
          setSubmitSuccess(true);
        },
        (error) => {
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
                  <td align="center" style={{ borderTop: "0px" }}>
                    <Image src={warlord1} roundedCircle style={warlordStyles} />
                  </td>
                  <td align="center" style={{ borderTop: "0px" }}>
                    <Image src={warlord2} roundedCircle style={warlordStyles} />
                  </td>
                  <td align="center" style={{ borderTop: "0px" }}>
                    <Image src={warlord3} roundedCircle style={warlordStyles} />
                  </td>
                  <td align="center" style={{ borderTop: "0px" }}>
                    <Image src={warlord4} roundedCircle style={warlordStyles} />
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    style={{ borderTop: "0px", paddingTop: 0 }}
                  >
                    <strong>Vilkyu [60H]</strong>
                    <br />
                    demon of loneliness
                    <br />
                    <span className="text-muted">Week 1</span>
                  </td>
                  <td
                    align="center"
                    style={{ borderTop: "0px", paddingTop: 0 }}
                  >
                    <strong>Muldur [65H]</strong>
                    <br />
                    demon of shame
                    <br />
                    <span className="text-muted">Week 2</span>
                  </td>
                  <td
                    align="center"
                    style={{ borderTop: "0px", paddingTop: 0 }}
                  >
                    <strong>Ziir [70H]</strong>
                    <br />
                    demon of purposelessness
                    <br />
                    <span className="text-muted">Week 3</span>
                  </td>
                  <td
                    align="center"
                    style={{ borderTop: "0px", paddingTop: 0 }}
                  >
                    <strong>Bradock [75H]</strong>
                    <br />
                    demon of fear
                    <br />
                    <span className="text-muted">Week 4</span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <p>
            The warlords have now been released into the realm of Fyetna&#347;,
            an in-between space where they are able to wreak havoc on humanity,
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
            The demons exist to separate, so they can only be defeated by unity.
            Each warrior will commit to working out 5 days of the week and
            together we will defeat them by rising to the fitness challenge.
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
            {warriors.length}/{totalWarriors}
          </h3>
          <Table className="border-bottom border-top border-dark">
            <tbody>
              <tr>
                {warriors.map(({ image, name, skill }) => (
                  <td align="center" className="border-0">
                    <Image src={image} roundedCircle style={peopleStyles} />
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
                  <strong>Are joint workouts worth more?</strong>
                </p>
                <p>
                  Yes, joint workouts will earn 2 hits per person that attended.
                  For example: 3 people ran together = 3 * 2 = 6 hits.
                </p>
              </>
            </Accordion.Collapse>
          </Accordion>
          <div className="py-1" />
          {submitSuccess ? (
            <div>
              You have enlisted! Josh will get you added to the warriors list
              today.
            </div>
          ) : (
            <Form id="enlist-form" onSubmit={sendEmail}>
              <Card
                className="border-danger"
                style={{ backgroundColor: "#212529" }}
              >
                <Card.Body>
                  <Form.Label className="mb-1 text-light">Name</Form.Label>
                  <Form.Control type="text" className="mb-2" name="name" />
                  <Form.Label className="mb-1 text-light">
                    Phone Number
                  </Form.Label>
                  <Form.Control type="text" className="mb-2" name="phone" />
                  <Form.Label className="mb-1 text-light">
                    Primary Skill
                  </Form.Label>
                  <Form.Control as="select" className="mb-2" name="skill">
                    <option>Select one...</option>
                    <option>Archer (runner)</option>
                    <option>Knight (bicyclist)</option>
                    <option>Gladiator (weight-lifter)</option>
                    <option>Sorcerer (multiple)</option>
                  </Form.Control>
                  <Form.Label className="mb-1 text-light">
                    Avatar (max image size: 500kb)
                  </Form.Label>
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
                  <Form.Label className="mb-1 text-light">
                    Address (for a small gift)
                  </Form.Label>
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
          <div className="py-2" />
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
