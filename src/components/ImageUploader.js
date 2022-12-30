import { useState, useEffect } from "react";
import { Form, Image } from "react-bootstrap";
import { Storage } from "aws-amplify";
import { FaTimes } from "react-icons/fa";

import useIsMounted from "../lib/useIsMounted";

export default ImageUploader;

function ImageUploader({
  imageDisplayName = "Image",
  images,
  afterEdit,
  fieldId,
  fieldName = "",
  fileSizeLimit = 5, // MB
  allowMultiple = true,
  classes,
}) {
  const [imageUrls, setImageUrls] = useState([]);
  const isMounted = useIsMounted();

  async function handleImageUpload(e) {
    const { files } = e.target;

    if (!files || files.length === 0) return;

    let showFileSizeError = false;

    let uploads = [];

    if (allowMultiple) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSizeInMegabytes = (file.size / 1024 / 1024).toFixed(4);

        if (fileSizeInMegabytes > fileSizeLimit) {
          showFileSizeError = true;
        } else {
          uploads.push(
            Storage.put(file.name, file, { contentType: file.type })
          );
        }
      }
    } else {
      const file = files[0];
      const fileSizeInMegabytes = (file.size / 1024 / 1024).toFixed(4);

      if (fileSizeInMegabytes > fileSizeLimit) {
        showFileSizeError = true;
      } else {
        uploads.push(Storage.put(file.name, file, { contentType: file.type }));
      }
    }

    console.log("uploads", uploads);

    const resUploadKeyObjects = await Promise.all(uploads);

    console.log("resUploadKeyObjects", resUploadKeyObjects);

    if (resUploadKeyObjects && resUploadKeyObjects.length > 0) {
      const resUploadKeys = resUploadKeyObjects.map((obj) => obj.key);
      console.log("resUploadKeys", resUploadKeys);

      const updImages = [...images, ...resUploadKeys];

      console.log("updImages", updImages);

      afterEdit(updImages);
    }

    if (showFileSizeError) {
      const errorText = allowMultiple
        ? `One or more ${imageDisplayName}'s exceeds the size limit of ${fileSizeLimit}MB`
        : `${imageDisplayName} exceeds the size limit of ${fileSizeLimit}MB`;
      alert(errorText);
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

  const reachedImageLimit = images?.length === 1 && !allowMultiple;

  return (
    <div className={classes}>
      {!reachedImageLimit ? (
        <Form.Control
          id={fieldId}
          type="file"
          className="mb-2"
          multiple={allowMultiple}
          onChange={handleImageUpload}
          name={fieldName}
        />
      ) : null}
      {images.length ? (
        <div>
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
    </div>
  );
}
