import React, { useState, useEffect, Fragment } from "react";
import { Button, Form, FormControl, Image } from "react-bootstrap";
import { Storage } from "aws-amplify";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import RichTextEditor from "./RichTextEditor";
import { FaTimes } from "react-icons/fa";
export default PostEditor;

function ImageUploader({ images, imageUrls, afterEdit }) {
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    const { key } = await Storage.put(file.name, file, {
      contentType: file.type,
    });
    if (key) {
      const updImages = [...images, key];
      afterEdit(updImages);
      // setImages(updImages);
    }
  }

  return imageUrls.map((url, i) => (
    <>
      <Form.File
        id="images"
        className="mb-2"
        label="Images"
        onChange={handleImageUpload}
      />
      <div className="mb-2">
        <Fragment key={i}>
          <Image key={url} src={url} width="100" height="auto" thumbnail />
          <FaTimes
            color="#dc3545"
            title="delete image"
            className="cursor-pointer"
            onClick={() => {
              const updImages = images;
              updImages.splice(i, 1);
              afterEdit(updImages);
              // setImages(updImages);
            }}
          />
        </Fragment>
      </div>
    </>
  ));
}
