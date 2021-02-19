import React, { useState, useEffect } from "react";
import { useIsMounted } from "../lib/utils";
import { Storage } from "aws-amplify";
export default MiniImage;

function MiniImage({ images = [], classes = "" }) {
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
    <img
      src={imageUrls[0]}
      alt={imageUrls[0]}
      className="img-fluid"
      style={{ width: "110px" }}
    />
  );
}
