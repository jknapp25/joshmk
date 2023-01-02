import { Text } from "@chakra-ui/react";

export const Category = ({ attributes, category }) => {
  if (!category) return;

  return (
    <Text
      display="inline"
      color="gray.600"
      fontWeight="medium"
      fontSize="sm"
      {...attributes}
    >
      {category}
    </Text>
  );
};
