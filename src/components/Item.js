import React from "react";
import moment from "moment";
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
import train from "../assets/train.png";
import bestThings from "../assets/best_things.jpeg";
import kissingRi from "../assets/kissing_ri.jpeg";
import profileFemale from "../assets/profile.png";
import profileMale from "../assets/profile_male.png";
import jon from "../assets/jon.jpeg";
import desk from "../assets/desk.jpg";
import loft1 from "../assets/loft1.jpg";
import ian from "../assets/ian.jpeg";
import janPaul from "../assets/jan-paul.jpg";
import sfMarathon from "../assets/sf-marathon.jpeg";
import portMarathon from "../assets/portland-marathon2.jpeg";
import goalHours from "../assets/goalhours.png";
export default Item;

const pictures = [
  selfie,
  ios,
  logo,
  libby,
  vanDeath,
  assistant,
  train,
  bestThings,
  kissingRi,
  profileFemale,
  profileMale,
  jon,
  desk,
  loft1,
  ian,
  janPaul,
  sfMarathon,
  portMarathon,
  goalHours
];

function createFooter(start, end, lastUpdated) {
  return start && end
    ? moment(start).format("MMM Y") + " - " + moment(end).format("MMM Y")
    : start && lastUpdated
    ? moment(start).format("MMM Y") +
      " - " +
      moment(lastUpdated).format("MMM Y")
    : start
    ? moment(start).format("MMM Y") + " - Now"
    : end
    ? moment(end).format("MMM Y")
    : lastUpdated
    ? "Last updated" + moment(lastUpdated).format("MMM Y")
    : "No date info available";
}

function Item({ item, bottomMargin = "" }) {
  const {
    title,
    subtitle,
    subtitleLink,
    tags,
    description,
    link,
    img,
    start,
    end,
    lastUpdated,
    width,
    location,
    badge,
    badgeText,
    badgeVariant,
    people
  } = item;
  const footer = createFooter(start, end, lastUpdated);

  const totalPeopleWithQuotes = people
    ? people.reduce((acc, curr) => (curr.quote ? ++acc : acc), 0)
    : 0;
  const totalPeopleWithoutQuotes = people
    ? people.reduce((acc, curr) => (!curr.quote ? ++acc : acc), 0)
    : 0;

  return (
    <Card className={`${bottomMargin} ${width}`}>
      {img && <Card.Img variant="top" src={pictures[img]} />}
      <Card.Body>
        <Card.Title>
          {link ? (
            <a href={link} target="_blank" rel="noreferrer noopener">
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
            <a
              href={subtitleLink || ""}
              target="_blank"
              rel="noreferrer noopener"
            >
              {subtitle}
            </a>
          ) : (
            subtitle
          )}{" "}
          {location && `- ${location}`}
        </Card.Subtitle>
        {description && (
          <Card.Text className={`${tags && tags.length > 0 ? "mb-2" : ""}`}>
            {description}
          </Card.Text>
        )}
        {tags && tags.length > 0 && (
          <Card.Text>
            {tags.map((tag, i) => (
              <Badge pill variant="transparent" className="mr-2" key={i}>
                {tag}
              </Badge>
            ))}
          </Card.Text>
        )}
      </Card.Body>
      {!!totalPeopleWithQuotes && (
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            {people.map(
              ({ name, quote, img }, i) =>
                quote && (
                  <>
                    <OverlayTrigger
                      key={i}
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-${i}`}>{`${
                          quote ? quote + " -" + name : name
                        }`}</Tooltip>
                      }
                    >
                      <img
                        src={pictures[img]}
                        width="40px"
                        alt="Co-worker_image"
                        height="40px"
                        style={{ borderRadius: "20px" }}
                        className="mr-2"
                      />
                    </OverlayTrigger>
                  </>
                )
            )}
            <span className="text-muted">
              {" "}
              + {totalPeopleWithoutQuotes}{" "}
              {totalPeopleWithoutQuotes > 1 ? "others" : "other"}
            </span>
          </ListGroupItem>
        </ListGroup>
      )}
      <Card.Footer>
        <small className="text-muted">{footer}</small>
      </Card.Footer>
    </Card>
  );
}
