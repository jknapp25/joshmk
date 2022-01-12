import React, { useState, useEffect, useContext } from "react";
import { ImageContext } from "../App";
import { Image } from "react-bootstrap";
import { useIsMounted } from "../lib/utils";
import { Storage } from "aws-amplify";
export default ImageSlider;

function ImageSlider({ images = [], classes = "" }) {
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

  if (images.length === 0) return null;

  // const isOneImage = images.length === 1;

  return (
    // <Carousel
    //   className={classes}
    //   interval={1000000}
    //   controls={!isOneImage}
    //   indicators={!isOneImage}
    //   slide={false}
    // >
    //   {imageUrls.map((url, i) => (
    //     <Carousel.Item
    //       key={i}
    //       onClick={() =>
    //         imageContext.setImageContext({
    //           ...imageContext,
    //           isOpen: true,
    //           index: i,
    //           imageUrls: imageUrls,
    //         })
    //       }
    //       style={{ cursor: "zoom-in" }}
    //     >
    //       <img className="w-100" src={url} alt={url} />
    //     </Carousel.Item>
    //   ))}
    // </Carousel>

    <div
      className="d-block mb-2"
      style={{
        whiteSpace: "nowrap",
        overflowX: "scroll",
      }}
    >
      {imageUrls.map((url, i) => {
        return (
          <Image
            src={url}
            style={{
              width: "175px",
            }}
            className="me-2"
          />
        );
      })}
    </div>
  );
}
