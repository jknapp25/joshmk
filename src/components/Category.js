import { Text } from "@chakra-ui/react";

export const Category = ({ attributes, category }) => {
  if (!category) return;

  return (
    <Text
      fontSize="sm"
      display="inline"
      text="muted"
      textTransform="uppercase"
      {...attributes}
    >
      {category}
    </Text>
  );
};
