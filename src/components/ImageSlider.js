import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useIsMounted } from "../lib/utils";
import { Storage } from "aws-amplify";
export default ImageSlider;

function ImageSlider({ images = [] }) {
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
