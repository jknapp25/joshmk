import React from "react";
import { navigate } from "@reach/router";
import { Card } from "react-bootstrap";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
export default ProfileCard;

function ProfileCard({ avatarUrl, config }) {
  return (
    <Card className="hidden-xs">
      <Card.Img variant="top" src={avatarUrl} onClick={() => navigate("/")} />
      <Card.Body>
        <Card.Text>{config.tagline}</Card.Text>
      </Card.Body>
      <Card.Footer
        className="text-danger cursor-pointer"
        onClick={() => navigate("/about")}
      >
        Get to know me
        <HiOutlineArrowNarrowRight
          size="1.7em"
          className="float-right"
          color=""
          style={{ transform: "scaleY(-1)", margin: "0 auto" }}
        />
      </Card.Footer>
    </Card>
  );
}
