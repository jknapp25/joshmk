import React from "react";
import {
  Badge,
  Card,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import selfie from "../assets/ProfilePic.jpg";
import ios from "../assets/inventionofsound.jpeg";
import libby from "../assets/libby_van.jpeg";
import vanDeath from "../assets/van_death.jpeg";
import assistant from "../assets/tumps_assistant.jpeg";
import logo from "../assets/josh_logo_5.png";
export default Item;

const pictures = [selfie, ios, logo, libby, vanDeath, assistant];

function Item({ item, bottomMargin }) {
  const {
    title,
    subtitle,
    subtitleLink,
    tags,
    description,
    link,
    img,
    footer,
    width,
    location,
    badge,
    badgeText,
    badgeVariant,
    people
  } = item;
  return (
    <Card className={`${bottomMargin} ${width}`}>
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
          {badge && (
            <Badge variant={badgeVariant} className="ml-2">
              {badgeText}
            </Badge>
          )}
        </Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          {subtitleLink ? (
            <a href={subtitleLink || ""} target="_blank">
              {subtitle}
            </a>
          ) : (
            subtitle
          )}{" "}
          {location && `- ${location}`}
        </Card.Subtitle>
        <Card.Text>
          {description}
          {description && tags && <br />}
          {tags.map((tag, i) => {
            return (
              <Badge pill variant="secondary" className="mr-2" key={i}>
                {tag}
              </Badge>
            );
          })}
        </Card.Text>
      </Card.Body>
      {people && (
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            {people.map(({ name, quote }, i) => {
              return (
                <OverlayTrigger
                  key={i}
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-${i}`}>
                      {quote}
                      <br />-{name}
                    </Tooltip>
                  }
                >
                  <img
                    src={selfie}
                    width="40px"
                    alt="Co-worker_image"
                    height="40px"
                    style={{ borderRadius: "20px" }}
                    className="mr-2"
                  />
                </OverlayTrigger>
              );
            })}
          </ListGroupItem>
        </ListGroup>
      )}
      <Card.Footer>
        <small className="text-muted">{footer}</small>
      </Card.Footer>
    </Card>
  );
}
