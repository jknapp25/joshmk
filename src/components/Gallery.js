import React, { useContext, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Storage } from "aws-amplify";
import { ConfigContext } from "../App";
import { useIsMounted } from "../lib/utils";
export default Gallery;

function Gallery() {
  const { galleryImages } = useContext(ConfigContext);

  const [imageUrls, setImageUrls] = useState([]);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const imagesCalls = galleryImages.map((url) => Storage.get(url));
      const resImageUrls = await Promise.all(imagesCalls);

      if (isMounted.current) setImageUrls(resImageUrls);
    }
    if (galleryImages && galleryImages.length) {
      fetchData();
    } else {
      if (isMounted.current) setImageUrls([]);
    }
  }, [galleryImages, isMounted]);

  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <div className="mt-3">
      {imageUrls.map((imageUrl, i) => (
        <Image
          key={i}
          src={imageUrl}
          style={{ width: "200px", height: "250px" }}
          className="m-3"
        />
      ))}
    </div>
  );
}
