import { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Storage } from "aws-amplify";

import useIsMounted from "../lib/useIsMounted";

export default MiniImage;

function MiniImage({ images = [] }) {
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
      className="ratio ratio-4x3 bg-secondary bg-opacity-10"
      style={{ width: "150px" }}
    >
      {imageUrls[0] ? (
        <Image
          style={{ objectFit: "cover" }}
          src={imageUrls[0]}
          alt={imageUrls[0]}
          fluid
        />
      ) : null}
    </div>
  );
}
