import React, { useState, useEffect } from "react";
import { Badge, Card, Carousel } from "react-bootstrap";
import { navigate } from "@reach/router";
import { Storage } from "aws-amplify";
import { createTimeInfo, useIsMounted, statusColorLookup } from "../lib/utils";
import { GoPencil } from "react-icons/go";
export default Project;

function Project({ project, setEditingItemId, setItemType, showEdit = false }) {
  const { id, name, tags, summary, status, link, images, start, end } = project;
  const timeInfo = createTimeInfo(start, end, null, false);
  const isMounted = useIsMounted();

  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const imagesCalls = images.map((url) => Storage.get(url));
      const imageUrls = await Promise.all(imagesCalls);
      if (isMounted.current) setImageUrls(imageUrls);
    }
    if (images && images.length) {
      fetchData();
    }
  }, [images, isMounted]);

  return (
    <Card className="mb-4">
      {images && images.length > 1 ? (
        <Carousel interval={10000000}>
          {imageUrls.map((url, i) => (
            <Carousel.Item key={i}>
              <Card.Img variant="top" src={url} />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : null}
      {images && images.length === 1 && imageUrls[0] ? (
        <Card.Img variant="top" src={imageUrls[0]} />
      ) : null}
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
          ) : null}{" "}
          {showEdit ? (
            <span
              onClick={() => {
                setItemType("project");
                setEditingItemId(id);
                window.scrollTo(0, 0);
              }}
            >
              <GoPencil
                color="secondary"
                style={{
                  display: "inline",
                  cursor: "pointer",
                  color: "#6c757d",
                }}
              />
            </span>
          ) : null}
        </Card.Title>
        {summary ? (
          <Card.Text className="font-weight-normal">{summary}</Card.Text>
        ) : null}
        {tags && tags.length > 0 && (
          <Card.Text
            style={{
              whiteSpace: "nowrap",
              overflowX: "scroll",
              boxShadow: "",
            }}
            className="mt-2"
          >
            {tags.map((tag, i) => (
              <Badge
                pill
                variant="transparent"
                className="mr-2"
                key={i}
                onClick={() => navigate(`/search?tag=${tag}`)}
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
