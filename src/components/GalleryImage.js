import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "aws-amplify";

import useIsMounted from "../lib/useIsMounted";

export default GalleryImage;

function GalleryImage({ image = "" }) {
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const imageCall = await Storage.get(image);

      if (isMounted.current) setImageUrl(imageCall);
    }
    if (image) {
      fetchData();
    }
  }, [image, isMounted]);

  if (!imageUrl) return null;

return (
    <img
      src={imageUrl}
      alt={imageUrl}
    />
  );
}
