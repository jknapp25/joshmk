import React, { useContext } from "react";
import { ImageContext } from "../App";
import { Image } from "react-bootstrap";
export default DashboardUserSummary;

function DashboardUserSummary({ config, avatarUrl }) {
  const imageContext = useContext(ImageContext);
  return (
    <>
      <div className="mb-2">
        <small className="text-dark">ABOUT THE AUTHOR</small>
      </div>
      <div className="ratio ratio-1x1 mb-3 bg-secondary bg-opacity-10">
        {avatarUrl ? (
          <Image
            className="w-100 shadow rounded"
            style={{
              objectFit: "cover",
              cursor: "zoom-in",
            }}
            src={avatarUrl}
            alt="Author profile image"
            fluid
            onClick={() =>
              imageContext.setImageContext({
                ...imageContext,
                isOpen: true,
                index: 0,
                imageUrls: [avatarUrl],
              })
            }
          />
        ) : null}
      </div>
      {config.tagline}
    </>
  );
}
