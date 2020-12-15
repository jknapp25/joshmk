import React, { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useIsMounted } from "../lib/utils";
import { Storage } from "aws-amplify";
export default ImageCarousel;

function ImageCarousel({ images = [] }) {
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

  return (
    <>
      {images.length > 1 ? (
        <Carousel className="mb-3" interval={10000000}>
          {imageUrls.map((url, i) => (
            <Carousel.Item key={i}>
              <img className="w-100" src={url} alt={url} />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Image className="mb-3 w-100" src={imageUrls[0]} fluid />
      )}
    </>
  );
}
