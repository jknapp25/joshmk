import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useIsMounted } from "../lib/utils";
import { Storage } from "aws-amplify";
export default ImageCarousel;

function ImageCarousel({ images = [], classes = "" }) {
  const [imageUrls, setImageUrls] = useState([]);
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

  const isOneImage = images.length === 1;

  return (
    <Carousel
      className={classes}
      controls={!isOneImage}
      indicators={!isOneImage}
      slide={false}
    >
      {imageUrls.map((url, i) => (
        <Carousel.Item key={i}>
          <img className="w-100" src={url} alt={url} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
