import React from "react";
import { Accordion, Button, Card, Table } from "react-bootstrap";
import items from "../lib/items.json";
export default Assessment;

function Assessment() {
  let uniqueTags = {};
  items.forEach(({ tags }) => {
    tags.forEach(tag => {
      if (!(tag in uniqueTags)) {
        uniqueTags[tag] = 1;
      } else {
        uniqueTags[tag]++;
      }
    });
  });

  let sortedTags = Object.keys(uniqueTags)
    .map(key => ({
      tag: key,
      QTY: uniqueTags[key]
    }))
    .sort((a, b) => b.QTY - a.QTY);

  let topSix = sortedTags.slice(0, 6);

  //project length
  //% of time skill was used (0-1)
  //project complexity (0-1)
  //# of projects
  //potential: self-assessed skill level beginner, intermediate, expert from your perspective
  //future: modifier of beginner, intermediate, expert from co-workers perspective

  //(project length in days x project complexity x % of time skill was used) +...+ (n projects)
  //IO , Scrumy, storyline
  //(200 x .9 x .6) + (40 x .6 x .75) + (20 x .7 x .75)

  return (
    <>
      <h3 className="mt-5 mb-4">My attempt at an objective self-assessment</h3>
      <p>Skill inflation is a serious problem. Especially in Software.</p>
      <p>
        This page is my attempt at honestly assessing my skills to the best of
        my ability. It is as much for you as it is for me. I realized that I
        could use my history to help me determine how my interests are changing
        to better predict where I want to head.
      </p>
      <p>
        I am developing a simple algorithm, based on a basic work item tagging
        strategy that can provide a more honest assessment of myself.
      </p>

      <Card className="mb-3">
        <Card.Body>
          <Card.Text>
            (project length in days x project complexity x % of time skill was
            used) +...+ (n projects) = skill ranking
          </Card.Text>
        </Card.Body>
      </Card>

      <p>
        This algorithm allows me to generate an index I can use to rank my
        skills...
      </p>

      <Table striped bordered className="mb-4">
        <tbody>
          <tr>
            <td width="50%" className="text-center">
              <h1 className="display-4 mt-5 font-weight-bold">
                {sortedTags[0].tag}
              </h1>
              <h5>Top Skill</h5>
            </td>
            <td width="50%" className="p-0">
              <Table className="mb-0">
                <tbody>
                  {topSix.map(({ tag, QTY }, i) => {
                    if (!i) return null;
                    return (
                      <tr key={i}>
                        <td className="border-right-0">{tag}</td>
                        <td className="text-right border-left-0">{QTY}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </td>
          </tr>
        </tbody>
      </Table>

      <p>Below are a few additional angles on my skills</p>

      <Accordion className="mb-4">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Most used skills
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th># of times used</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTags.map(({ tag, QTY }) => {
                    return (
                      <tr>
                        <td>{tag}</td>
                        <td>{QTY}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Longest used skills
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Coming soon</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}
