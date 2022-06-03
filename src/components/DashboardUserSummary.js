import React, { useContext, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Storage } from "aws-amplify";

import { ImageContext } from "../App";
import useIsMounted from "../lib/useIsMounted";
import { ConfigContext } from "../App";

export default DashboardUserSummary;

function DashboardUserSummary() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const imageContext = useContext(ImageContext);
  const config = useContext(ConfigContext);

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const avatarUrl = await Storage.get(config.avatar);
      if (avatarUrl && isMounted.current) setAvatarUrl(avatarUrl);
    }
    if (config.avatar) {
      fetchData();
    }
  }, [config.avatar, isMounted]);

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
