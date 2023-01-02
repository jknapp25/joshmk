import { VStack } from "@chakra-ui/react";

import ImageLink from "./ImageLink";
import { Category } from "./Category";

export default Prompt;

function Prompt({ prompt }) {
  if (!prompt) return;

  return (
    <VStack align="start" spacing={4}>
      <Category category={prompt.title} />
      {prompt.images.map((img) => (
        <ImageLink key={img} image={img.imageUrl} link={img.link} />
      ))}
    </VStack>
  );
}
