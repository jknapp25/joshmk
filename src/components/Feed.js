import React from "react";
import { Badge, Card } from "react-bootstrap";
import selfie from "../assets/ProfilePic.jpg";
import ios from "../assets/inventionofsound.jpeg";
import libby from "../assets/libby_van.jpeg";
import vanDeath from "../assets/van_death.jpeg";
import assistant from "../assets/tumps_assistant.jpeg";
import logo from "../assets/josh_logo_5.png";
export default Feed;

const pictures = [selfie, ios, logo, libby, vanDeath, assistant];

function Feed({ content, type }) {
  return content.map(
    ({ title, subtitle, tags, description, link, img, date, width }, i) => {
      return (
        <Card className={`mb-4 ${width}`} key={i}>
          {img && <Card.Img variant="top" src={pictures[img]} />}
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
            <Card.Subtitle className="text-muted mb-2">
              {subtitle}
            </Card.Subtitle>
            {description && (
              <Card.Text className="mb-2">{description}</Card.Text>
            )}
            {tags.map((tag, i) => {
              return (
                <Badge pill variant="secondary" className="mr-2" key={i}>
                  {tag}
                </Badge>
              );
            })}
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              {type === "projects"
                ? "Last Updated " + date
                : "Published " + date}
            </small>
          </Card.Footer>
        </Card>
      );
    }
  );
}
