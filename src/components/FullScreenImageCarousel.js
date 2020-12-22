import React from "react";
import { Image } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
export default FullScreenImageCarousel;

function FullScreenImageCarousel({ imageUrl, onClose }) {
  if (!imageUrl) return null;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "black",
        zIndex: 1000000,
      }}
    >
      <Image src={imageUrl} className="h-100 w-auto d-block mx-auto" />
      <FaTimes
        className="ml-2 position-absolute cursor-pointer"
        size="2em"
        color="white"
        onClick={onClose}
        style={{
          top: "10px",
          right: "10px",
        }}
      />
    </div>
  );
}
