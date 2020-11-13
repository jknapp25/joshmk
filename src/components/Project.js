import React, {useState,useEffect} from "react";
import {
  Badge,
  Card,
  Carousel,
} from "react-bootstrap";
import { navigate } from "@reach/router";
import { Storage } from "aws-amplify";
import { createTimeInfo } from "../lib/utils";
import {statusColorLookup} from '../lib/utils';
export default Project;

function Project({ project }) {
  const {
    name,
    tags,
    summary,
    status,
    link,
    images,
    start,
    end,
  } = project;
  const timeInfo = createTimeInfo(start, end, null, false);

  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const imageUrls = await Storage.get(images[0]);
      setImageUrls([imageUrls]);
    }
    if (images && images.length) {
      fetchData();
    }
  }, [images]);


  return (
    <Card className={`mb-2`}>
      {images && images.length > 1 ? (
        <Carousel interval={10000000}>
          {imageUrls.map((url, i) => (
            <Carousel.Item key={i}>
              <Card.Img variant="top" src={url} />
            </Carousel.Item>
          ))}
        </Carousel>
      ) :null}
      {images && images.length === 1 && imageUrls[0] ? (
        <Card.Img variant="top" src={imageUrls[0]} />
      ): null}
      <Card.Body>
        <Card.Title>
          {link ? (
            <a href={link} target="_blank" rel="noreferrer noopener">
              {name}
            </a>
          ) : (
            name
          )}
          {status ? (
            <Badge variant={statusColorLookup[status]} className="ml-2">
              {status}
            </Badge>
          ): null}
        </Card.Title>
        {summary ? (
          <Card.Text
            className={`${
              tags && tags.length > 0 ? "mb-2" : ""
            } font-weight-normal`}
          >
            {summary}
          </Card.Text>
        ) : null}
        {tags && tags.length > 0 && (
          <Card.Text
            style={{
              whiteSpace: "nowrap",
              overflowX: "scroll",
              boxShadow: "",
            }}
          >
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
      <Card.Footer>
        <small className="text-muted">{timeInfo}</small>
      </Card.Footer>
    </Card>
  );
}
