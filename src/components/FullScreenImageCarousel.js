import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { FaTimes, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ImageContext } from "../App";
export default FullScreenImageCarousel;

function FullScreenImageCarousel() {
  const imageContext = useContext(ImageContext);

  function handleClose() {
    imageContext.setImageContext({
      isOpen: false,
      index: null,
      imageUrls: [],
    });
  }

  function handleLeft() {
    const updImgIdx =
      imageContext.index - 1 >= 0
        ? imageContext.index - 1
        : imageContext.imageUrls.length - 1;

    imageContext.setImageContext({
      ...imageContext,
      index: updImgIdx,
    });
  }

  function handleRight() {
    const updImgIdx =
      imageContext.index < imageContext.imageUrls.length - 1
        ? imageContext.index + 1
        : 0;

    imageContext.setImageContext({
      ...imageContext,
      index: updImgIdx,
    });
  }

  if (imageContext.imageUrls.length === 0 || imageContext.index === null)
    return null;

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
        src={imageContext.imageUrls[imageContext.index]}
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
      {imageContext.imageUrls.length > 1 ? (
        <>
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
        </>
      ) : null}
    </div>
  );
}
