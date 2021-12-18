import React, { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Masonry from "react-masonry-css";
import { Storage } from "aws-amplify";
import { ConfigContext, ImageContext } from "../App";
import { useIsMounted } from "../lib/utils";
export default Gallery;

function Gallery() {
  const { galleryImages } = useContext(ConfigContext);
  const imageContext = useContext(ImageContext);

  const [imageUrls, setImageUrls] = useState([]);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const imagesCalls = galleryImages.map((url) => Storage.get(url));
      let resImageUrls = await Promise.all(imagesCalls);

      if (resImageUrls && resImageUrls.length > 0) {
        resImageUrls = resImageUrls.reverse();
      }

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
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {imageUrls.map((imageUrl, i) => (
        <Card key={imageUrl} className="border-0">
          <Card.Img
            variant="top"
            style={{ cursor: "zoom-in" }}
            src={imageUrl}
            onClick={() =>
              imageContext.setImageContext({
                ...imageContext,
                index: i,
                imageUrls,
              })
            }
          />
        </Card>
      ))}
    </Masonry>
  );
}
