import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { Storage } from "aws-amplify";
import { Text, VStack } from "@chakra-ui/react";

import useIsMounted from "../lib/useIsMounted";
import { ConfigContext } from "../App";
import { Category } from "./Category";

export default UserMiniSummary;

function UserMiniSummary() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const config = useContext(ConfigContext);

  const navigate = useNavigate();

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

  const aboutLink = config.pagesCustom.find(
    (page) => page.name === "about"
  )?.link;

  return (
    <VStack align="start" spacing={4}>
      <Category category="ABOUT THE AUTHOR" />
      <div className="ratio ratio-1x1 bg-secondary bg-opacity-10">
        {avatarUrl ? (
          <Image
            className="w-100"
            style={{
              objectFit: "cover",
              cursor: aboutLink ? "pointer" : "default",
            }}
            src={avatarUrl}
            alt="Author profile image"
            fluid
            onClick={() => {
              if (aboutLink) navigate(aboutLink);
            }}
          />
        ) : null}
      </div>
      <Text fontSize="lg">{config.tagline}</Text>
    </VStack>
  );
}
