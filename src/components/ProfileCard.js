import React from "react";
import { navigate } from "@reach/router";
import { Card } from "react-bootstrap";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FiCoffee, FiInstagram, FiMail } from "react-icons/fi";
export default ProfileCard;

function ProfileCard({ avatarUrl, config }) {
  if (!avatarUrl) return null;
  return (
    <Card className="hidden-xs">
      <Card.Img variant="top" src={avatarUrl} onClick={() => navigate("/")} />
      <Card.Body>
        <Card.Text>
          {config.tagline}
          {"  "}
          <span className="text-danger">
            More{" "}
            <HiOutlineArrowNarrowRight
              size="1em"
              className="text-danger"
              color=""
              style={{ transform: "scaleY(-1)" }}
            />
          </span>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        {config && config.instagramUrl ? (
          <div>
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark"
            >
              <FiInstagram className="d-inline mr-3" />
              <span className="d-inline">
                {config.instagramUrl.split("https://www.instagram.com/")[1]}
              </span>
            </a>
          </div>
        ) : null}
        {config && config.youtubeUrl ? (
          <div>
            <a
              href={config.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark"
            >
              <FiInstagram className="d-inline mr-3" />
              <span className="d-inline">YouTube Channel</span>
            </a>
          </div>
        ) : null}
        {config && config.emailAddress ? (
          <div>
            <FiMail className="d-inline mr-3" />
            <span className="d-inline">{config.emailAddress}</span>
          </div>
        ) : null}
        {config && config.supportUrl ? (
          <div>
            <a
              href={config.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiCoffee className="d-inline mr-3 text-danger" />
              <span className="d-inline text-danger">Buy me a coffee!</span>
            </a>
          </div>
        ) : null}
      </Card.Footer>
    </Card>
  );
}
