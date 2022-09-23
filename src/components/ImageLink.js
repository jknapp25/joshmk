import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Storage } from "aws-amplify";

import useIsMounted from "../lib/useIsMounted";

export default ImageLink;

function ImageLink({ image = "", link = "" }) {
  const [imageUrl, setImageUrl] = useState("");
  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const resImageUrl = await Storage.get(image);

      if (isMounted.current) setImageUrl(resImageUrl);
    }
    if (image) {
      fetchData();
    } else {
      if (isMounted.current) setImageUrl("");
    }
  }, [image, isMounted]);

  if (!image) return;

  return (
    <Row className="gx-2">
      <Col key={imageUrl}>
        {link ? (
          <a href={link}>
            <img
              src={imageUrl}
              alt=""
              className="w-100 bg-secondary bg-opacity-10"
              style={{ cursor: "pointer" }}
            ></img>
          </a>
        ) : (
          <img
            src={imageUrl}
            alt=""
            className="w-100 bg-secondary bg-opacity-10"
          ></img>
        )}
      </Col>
    </Row>
  );
}
