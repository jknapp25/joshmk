import { useState, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Storage } from "aws-amplify";

import useIsMounted from "../lib/useIsMounted";
import { ImageContext } from "../App";

export default InlineImages;

function InlineImages({ attributes, images = [] }) {
  const [imageUrls, setImageUrls] = useState([]);
  const imageContext = useContext(ImageContext);

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const imagesCalls = images.map((url) => Storage.get(url));
      const resImageUrls = await Promise.all(imagesCalls);

      if (isMounted.current) setImageUrls(resImageUrls);
    }
    if (images && images.length) {
      fetchData();
    } else {
      if (isMounted.current) setImageUrls([]);
    }
  }, [images, isMounted]);

  if (!images || images.length === 0) return;

  return (
    <Row {...attributes} className="gx-2">
      {imageUrls.map((url, i) => (
        <Col key={url}>
          <img
            contentEditable={false}
            src={url}
            alt=""
            className="w-100 bg-secondary bg-opacity-10"
            onClick={() =>
              imageContext.setImageContext({
                ...imageContext,
                isOpen: true,
                index: i,
                imageUrls: imageUrls,
              })
            }
            style={{ cursor: "zoom-in" }}
          ></img>
        </Col>
      ))}
    </Row>
  );
}
