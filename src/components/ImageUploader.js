import React, { useState, useEffect } from "react";
import { Form, FormFile, Image } from "react-bootstrap";
import { Storage } from "aws-amplify";
import { FaTimes } from "react-icons/fa";
import { useIsMounted } from "../lib/utils";
export default ImageUploader;

function ImageUploader({
  imageDisplayName = "Image",
  images,
  afterEdit,
  fieldId,
  fieldLabel,
  fileSizeLimit = 5, // MB
  imageLimit = null,
}) {
  const [imageUrls, setImageUrls] = useState([]);
  const isMounted = useIsMounted();

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    const fileSizeInMegabytes = (file.size / 1024 / 1024).toFixed(4);

    if (fileSizeInMegabytes > fileSizeLimit) {
      alert(`${imageDisplayName} cannot be larger than ${fileSizeLimit}MB`);
      return;
    }

    const { key } = await Storage.put(file.name, file, {
      contentType: file.type,
    });
    if (key) {
      const updImages = [...images, key];
      afterEdit(updImages);
    }
  }

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

  const reachedImageLimit =
    imageLimit && images && images.length === imageLimit;

  return (
    <>
      <FormFile.Label className="mb-1">{fieldLabel}</FormFile.Label>
      {!reachedImageLimit ? (
        <Form.File id={fieldId} className="mb-2" onChange={handleImageUpload} />
      ) : null}
      {images.length ? (
        <div className="mb-2">
          {imageUrls.map((url, i) => (
            <div key={i} className="d-inline-block pr-2 pb-2">
              <Image key={url} src={url} width="100" height="auto" />
              <FaTimes
                color="#dc3545"
                title="delete image"
                className="cursor-pointer float-right"
                onClick={() => {
                  const updImages = [...images];
                  updImages.splice(i, 1);
                  afterEdit(updImages);
                }}
              />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
