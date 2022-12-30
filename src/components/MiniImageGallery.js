import { useContext } from "react";
import { Row, Col, Card } from "react-bootstrap";

import { ImageContext } from "../App";

export default MiniImageGallery;

function MiniImageGallery({ images }) {
  const imageContext = useContext(ImageContext);

  return (
    <>
      <Row className="mt-1">
        {[1, 2, 3].map((num) => (
          <Col
            key={num}
            className={`text-center ${num === 1 ? "pr-1" : ""} ${
              num === 2 ? "px-1" : ""
            } ${num === 3 ? "pl-1" : ""}`}
          >
            <Card.Img
              variant="top"
              src={images[images.length - num]}
              className="cursor-pointer"
              style={{ cursor: "zoom-in" }}
              onClick={() => {
                imageContext.setImageContext({
                  isOpen: true,
                  index: images.length - num,
                  imageUrls: images,
                });
              }}
            />
          </Col>
        ))}
      </Row>
      <Row className="mt-2">
        {[4, 5, 6].map((num) => (
          <Col
            key={num}
            className={`text-center ${num === 4 ? "pr-1" : ""} ${
              num === 5 ? "px-1" : ""
            } ${num === 6 ? "pl-1" : ""}`}
          >
            <Card.Img
              variant="top"
              src={images[images.length - num]}
              className="cursor-pointer"
              style={{ cursor: "zoom-in" }}
              onClick={() => {
                imageContext.setImageContext({
                  isOpen: true,
                  index: images.length - num,
                  imageUrls: images,
                });
              }}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
