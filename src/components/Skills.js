import React from "react";
import { Accordion, Alert, Button, Card, Table } from "react-bootstrap";
import { FaMagic, FaPaperPlane } from "react-icons/fa";
import { GiMagnifyingGlass, GiBrain } from "react-icons/gi";
import items from "../lib/items.json";
import { calcSkillsAssessments } from "../lib/utils";
export default Skills;

function Skills() {
  const {
    topSix,
    sortedTagsByRank,
    sortedTagsByNumUsed,
    sortedTagsByTimeUsed,
  } = calcSkillsAssessments(items);

  return (
    <>
      <h3 className="mb-4">Skills Overview</h3>
      <h5>
        Top Skills <FaPaperPlane color="blue" size="1em" />
      </h5>
      <Table striped bordered className="mb-4">
        <tbody>
          <tr>
            <td width="50%" className="text-center">
              <h1
                className="display-5 font-weight-bold"
                style={{ marginTop: "65px" }}
              >
                {sortedTagsByRank[0].tag}
              </h1>
              <h5>Top Skill</h5>
              <h6 className="mt-5 float-right mb-0">
                {sortedTagsByRank[0].rankIndex}
              </h6>
            </td>
            <td width="50%" className="p-0">
              <Table className="mb-0">
                <tbody>
                  {topSix.map(({ tag, rankIndex }, i) => {
                    if (!i) return null;
                    return (
                      <tr key={i}>
                        <td className="border-right-0">{tag}</td>
                        <td className="text-right border-left-0">
                          {rankIndex}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </td>
          </tr>
        </tbody>
      </Table>

      <h5>
        Algorithm <FaMagic color="red" size="1em" />
      </h5>

      <Alert variant="warning">
        ((project length x project complexity x skill usage) - (1% x months
        after end)) +...+ [n projects] = skill rating
      </Alert>

      <h5>
        Other insights <GiMagnifyingGlass color="purple" size="1em" />
      </h5>

      <Accordion className="mb-4">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              All skills
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {sortedTagsByRank.map(({ tag }) => tag).join(", ")}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              All skills ranked
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTagsByRank.map(({ tag, rankIndex }, i) => (
                    <tr key={i}>
                      <td>{tag}</td>
                      <td>{rankIndex || "Unknown"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Most used skills
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th># of times used</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTagsByNumUsed.map(({ tag, numUsed }, i) => (
                    <tr key={i}>
                      <td>{tag}</td>
                      <td>{numUsed}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              Longest used skills
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Time used</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTagsByTimeUsed.map(({ tag, timeUsed }, i) => (
                    <tr key={i}>
                      <td>{tag}</td>
                      <td>{timeUsed ? timeUsed + " days" : "Unknown"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <h5>
        Reasoning <GiBrain color="pink" size="1em" />
      </h5>

      <p>
        Through being involved in interviewing over 30 devs over the past few
        years, it's become clear to me that skill inflation is a serious
        problem. Especially in Software. I'd like to see if there's a better
        way.
      </p>
      <p>
        This page is my attempt at honestly assessing my skills to the best of
        my ability (AKA automagically) for employers as well as for myself. I
        realized I could also use my history to help me determine how my
        interests are changing to better predict where I want to head.
      </p>
      <p>
        The above algorithm is based on a simple work item tagging strategy and
        allows me to generate a value I can use to rank my skills. It is
        constantly being improved to provide a more accurate assessment. I might
        provide an API if I like where it's heading.
      </p>
    </>
  );
}
