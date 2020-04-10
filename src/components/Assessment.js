import React from "react";
import moment from "moment";
import { Accordion, Button, Card, Table } from "react-bootstrap";
import { FaMagic } from "react-icons/fa";
import { GiMagnifyingGlass } from "react-icons/gi";
import items from "../lib/items.json";
export default Assessment;

function Assessment() {
  let uniqueTags = {};

  // get calculations
  items.forEach(({ tags, start, end, complexity, tagUsage }) => {
    const st = start ? moment(start) : null;
    const en = end ? moment(end) : moment();
    const length = en.diff(st, "days") || null;
    const monthsAfterEnd = moment().diff(en, "months");

    tags.forEach((tag, i) => {
      if (!(tag in uniqueTags)) {
        uniqueTags[tag] = { numUsed: 0, timeUsed: 0, rankIndex: 0 };
      }

      uniqueTags[tag].numUsed++;
      uniqueTags[tag].timeUsed = length
        ? length + uniqueTags[tag].timeUsed
        : uniqueTags[tag].timeUsed;
      uniqueTags[tag].rankIndex =
        length && complexity && tagUsage[i]
          ? length * complexity * tagUsage[i] -
            0.01 * monthsAfterEnd +
            uniqueTags[tag].rankIndex
          : uniqueTags[tag].rankIndex;
    });
  });

  let sortedTagsByNumUsed = Object.keys(uniqueTags)
    .map(key => ({
      tag: key,
      numUsed: uniqueTags[key].numUsed
    }))
    .sort((a, b) => b.numUsed - a.numUsed);

  let sortedTagsByTimeUsed = Object.keys(uniqueTags)
    .map(key => ({
      tag: key,
      timeUsed: uniqueTags[key].timeUsed
    }))
    .sort((a, b) => b.timeUsed - a.timeUsed);

  let sortedTagsByRank = Object.keys(uniqueTags)
    .map(key => ({
      tag: key,
      rankIndex: Math.round(uniqueTags[key].rankIndex)
    }))
    .sort((a, b) => b.rankIndex - a.rankIndex);
  let topSix = sortedTagsByRank.slice(0, 6);

  //project length
  //% of time skill was used (0-1)
  //project complexity (0-1)
  //# of projects
  //potential: self-assessed skill level beginner, intermediate, expert from your perspective
  //future: modifier of beginner, intermediate, expert from co-workers perspective

  //(project length in days x project complexity x % of time skill was used) - (.1 x mo from end) +...+ (n projects)
  //IO , Scrumy, storyline
  //(200 x .9 x .6) + (40 x .6 x .75) + (20 x .7 x .75)

  return (
    <>
      <h3 className="mt-5 mb-4">Skills Assessment</h3>

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

      <Card className="mb-4" style={{ border: "2px solid gold" }}>
        <Card.Body>
          <Card.Text>
            ((project length x project complexity x skill usage) - (.1 x months
            after end)) +...+ [n projects] = skill ranking
          </Card.Text>
        </Card.Body>
      </Card>

      <h5>
        Other insights <GiMagnifyingGlass color="purple" size="1em" />
      </h5>

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
                  {sortedTagsByNumUsed.map(({ tag, numUsed }) => {
                    return (
                      <tr>
                        <td>{tag}</td>
                        <td>{numUsed}</td>
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
            <Card.Body>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Time used</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTagsByTimeUsed.map(({ tag, timeUsed }) => {
                    return (
                      <tr>
                        <td>{tag}</td>
                        <td>{timeUsed ? timeUsed + " days" : "Unknown"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <h5>Reasoning</h5>

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

      <p>
        This above algorithm allows me to generate an index I can use to rank my
        skills.
      </p>
    </>
  );
}
