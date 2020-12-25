import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { FaTimes, FaAngleLeft, FaAngleRight } from "react-icons/fa";
export default FullScreenImageCarousel;

function FullScreenImageCarousel({
  initialImageIdx = null,
  imageUrls = [],
  onClose,
}) {
  const [activeImageIdx, setActiveImageIdx] = useState(null);

  useEffect(() => {
    if (initialImageIdx !== null) {
      setActiveImageIdx(initialImageIdx);
    }
  }, [initialImageIdx]);

  function handleClose() {
    setActiveImageIdx(null);
    onClose();
  }

  function handleLeft() {
    const updImgIdx =
      activeImageIdx - 1 >= 0 ? activeImageIdx - 1 : imageUrls.length - 1;

    setActiveImageIdx(updImgIdx);
    onClose();
  }

  function handleRight() {
    const updImgIdx =
      activeImageIdx + 1 < imageUrls.length - 1 ? activeImageIdx + 1 : 0;

    setActiveImageIdx(updImgIdx);
    onClose();
  }

  if (imageUrls.length === 0 || activeImageIdx === null) return null;

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
      className="noSelect"
    >
      <Image
        src={imageUrls[activeImageIdx]}
        className="h-100 w-auto d-block mx-auto"
      />
      <FaTimes
        className="position-absolute cursor-pointer"
        size="2em"
        color="white"
        onClick={handleClose}
        style={{
          top: "10px",
          right: "10px",
        }}
      />
      <FaAngleLeft
        className="ml-2 position-absolute cursor-pointer"
        size="3em"
        color="white"
        onClick={handleLeft}
        style={{
          top: "50%",
          left: "10px",
        }}
      />
      <FaAngleRight
        className="ml-2 position-absolute cursor-pointer"
        size="3em"
        color="white"
        onClick={handleRight}
        style={{
          top: "50%",
          right: "10px",
        }}
      />
    </div>
  );
}
