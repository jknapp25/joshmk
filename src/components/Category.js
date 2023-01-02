import { Text } from "@chakra-ui/react";

export const Category = ({ attributes, category }) => {
  if (!category) return;

  return (
    <Text
      display="inline"
      color="gray.500"
      fontWeight="medium"
      textTransform="uppercase"
      fontSize="sm"
      {...attributes}
    >
      {category}
    </Text>
  );
};
