import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import ImageUploader from "./ImageUploader";
import { useIsMounted } from "../lib/utils";
import { ConfigContext } from "../App";
export default GalleryEditor;

function GalleryEditor({ onUpdate }) {
  const config = useContext(ConfigContext);
  const [images, setImages] = useState([]);
  const [edited, setEdited] = useState(false);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (config.galleryImages && config.galleryImages.length > 0) {
      setImages(config.galleryImages);
    }
  }, [config.galleryImages]);

  function clearEditor() {
    setImages([]);
  }

  function handleButtonClick() {
    const data = {
      ...config,
      galleryImages: images,
    };

    config.setConfig(data);

    delete data.createdAt;
    delete data.updatedAt;

    onUpdate("gallery", data);

    if (isMounted.current) clearEditor();
  }

  return (
    <>
      <ImageUploader
        images={images || []}
        afterEdit={(imgs) => {
          setImages(imgs);
          setEdited(true);
        }}
        fieldId="images"
        fieldLabel="Images"
        fileSizeLimit={5}
      />

      {edited ? (
        <Button className="mt-2" onClick={handleButtonClick}>
          Update
        </Button>
      ) : null}
    </>
  );
}
