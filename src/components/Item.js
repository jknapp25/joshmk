import React from "react";
import {
  Badge,
  Card,
  Carousel,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { navigate } from "@reach/router";
import { createTimeInfo } from "../lib/utils";
import selfie from "../assets/selfie2.jpg";
import ios from "../assets/inventionofsound.jpeg";
import ios2 from "../assets/The_Invention_of_Sound.jpg";
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
import bigMagicBook from "../assets/big-magic-book.jpg";
import bigMagicNotes from "../assets/big-magic-notes.jpg";
import bigMagicQuote from "../assets/big-magic-quote.jpg";
import goalHours from "../assets/goalhours.png";
import belltowerWindow from "../assets/belltower-window.jpg";
import harvester from "../assets/harvester.jpg";
import sfg21 from "../assets/sfg21.jpg";
import sfg22 from "../assets/sfg22.jpg";
import sfg31 from "../assets/sfg31.jpg";
import sfg32 from "../assets/sfg32.jpg";
import productCollage from "../assets/productCollage.jpg";
import autumn from "../assets/autumn.jpg";
import fig1 from "../assets/fig1.jpg";
import fig2 from "../assets/fig2.jpg";
import fig3 from "../assets/fig3.jpg";
import fungi1 from "../assets/fungi1.jpg";
import fungi2 from "../assets/fungi2.jpg";
import fungi3 from "../assets/fungi3.jpg";
import wedDress1 from "../assets/wedDress1.jpg";
import wedDress2 from "../assets/wedDress2.jpg";
import wedDress3 from "../assets/wedDress3.jpg";
import wedDress4 from "../assets/wedDress4.jpg";
import wedDress5 from "../assets/wedDress5.jpg";
export default Item;

const picture = [
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
  goalHours,
  ios2,
  bigMagicBook,
  bigMagicNotes,
  bigMagicQuote,
  belltowerWindow,
  harvester,
  sfg21,
  sfg22,
  sfg31,
  sfg32,
  productCollage,
  autumn,
  fig1,
  fig2,
  fig3,
  fungi1,
  fungi2,
  fungi3,
  wedDress4,
  wedDress1,
  wedDress2,
  wedDress3,
  wedDress5,
];

function Item({ item, bottomMargin = "" }) {
  const {
    title,
    subtitle,
    subtitleLink,
    tags,
    description,
    link,
    images,
    start,
    end,
    lastUpdated,
    width,
    location,
    badge,
    badgeText,
    badgeVariant,
    people,
  } = item;
  const timeIncludesDay = tags.includes("blog");
  const timeInfo = createTimeInfo(start, end, lastUpdated, timeIncludesDay);

  const totalPeopleWithQuotes = people
    ? people.reduce((acc, curr) => (curr.quote ? ++acc : acc), 0)
    : 0;
  const totalPeopleWithoutQuotes = people
    ? people.reduce((acc, curr) => (!curr.quote ? ++acc : acc), 0)
    : 0;

  return (
    <Card className={`${bottomMargin} ${width}`}>
      {images && images.length > 1 && (
        <Carousel interval={10000000}>
          {images.map((image) => {
            return (
              <Carousel.Item>
                <Card.Img variant="top" src={picture[image]} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
      {images && images.length === 1 && (
        <Card.Img variant="top" src={picture[images[0]]} />
      )}
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
          <Card.Text
            className={`${
              tags && tags.length > 0 ? "mb-2" : ""
            } font-weight-normal`}
          >
            {description}
          </Card.Text>
        )}
        {tags && tags.length > 0 && (
          <Card.Text
            style={{ whiteSpace: "nowrap", overflowX: "scroll", boxShadow: "" }}
          >
            <div
              style={{
                width: "30px",
                height: "25px",
                background: "linear-gradient(to right, transparent, white)",
                position: "absolute",
                right: "20px",
              }}
            />
            {tags.map((tag, i) => (
              <Badge
                pill
                variant="transparent"
                className="mr-2"
                key={i}
                onClick={() => navigate(`?search=${tag}`)}
              >
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
                      src={picture[img]}
                      width="40px"
                      alt="Co-worker_image"
                      height="40px"
                      className="mr-2 rounded-circle"
                    />
                  </OverlayTrigger>
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
        <small className="text-muted">{timeInfo}</small>
      </Card.Footer>
    </Card>
  );
}
