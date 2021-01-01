import React, { useContext, useState, useEffect } from "react";
import { Card, CardColumns } from "react-bootstrap";
import FullScreenImageCarousel from "./FullScreenImageCarousel";
import { Storage } from "aws-amplify";
import { ConfigContext } from "../App";
import { useIsMounted } from "../lib/utils";
export default Gallery;

function Gallery() {
  const { galleryImages } = useContext(ConfigContext);

  const [imageUrls, setImageUrls] = useState([]);
  const [fsImageIdx, setFSImageIdx] = useState(null);
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
    <>
      <CardColumns>
        {imageUrls.map((imageUrl, i) => (
          <Card className="border-0">
            <Card.Img
              variant="top"
              style={{ cursor: "zoom-in" }}
              src={imageUrl}
              onClick={() => setFSImageIdx(i)}
            />
          </Card>
        ))}
      </CardColumns>
      <FullScreenImageCarousel
        initialImageIdx={fsImageIdx}
        imageUrls={imageUrls}
        onClose={() => setFSImageIdx(null)}
      />
    </>
  );
}
