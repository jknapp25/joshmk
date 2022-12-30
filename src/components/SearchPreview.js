import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

import MiniImage from "./MiniImage";

export default SearchPreview;

function SearchPreview({ thing = {}, type, borderTop }) {
  const navigate = useNavigate();

  let { id, title, images, createdAt } = thing;
  const date = moment(createdAt).format("dddd, MMM D, YYYY");

  return (
    <HStack
      onClick={() => navigate(`/${type}/${id}`)}
      cursor="pointer"
      borderTop={borderTop ? "1px" : undefined}
      borderBottom="1px"
      borderColor="gray.200"
      w="full"
      align="stretch"
      justify="space-between"
      alignItems="center"
      py={6}
      spacing={3}
    >
      <VStack align="start" spacing={0}>
        <Text fontWeight="bold">{title}</Text>
        <Text>{date}</Text>
      </VStack>
      <Box align="end">
        <MiniImage images={images} />
      </Box>
    </HStack>
  );
}
