import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useIsMounted from "../lib/useIsMounted";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

import ImageCarousel from "../components/ImageCarousel";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import ItemBuyButton from "../components/ItemBuyButton";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";

export default Item;

function Item({ item = {} }) {
  const [realItem, setRealItem] = useState(item);

  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const itemData = await API.graphql({
        query: queries.getItem,
        variables: { id: params.id },
      });

      if (itemData && isMounted.current) {
        setRealItem(itemData.data.getItem);
      }
    }
    if (params.id) {
      fetchData();
    }
  }, [params.id, isMounted]);

  if (!realItem) return null;

  let { name, description, images, isForSale, isSold, price, tags } = realItem;

  description = description ? JSON.parse(description) : description;

  return (
    <VStack spacing={10}>
      <ImageCarousel images={images} isItem />

      <VStack spacing={5}>
        <Heading size="md">{name}</Heading>
        <ItemBuyButton isForSale={isForSale} isSold={isSold} price={price} />
      </VStack>

      {description ? (
        <RichTextEditor
          value={description}
          onChange={() => {}}
          readOnly={true}
        />
      ) : null}

      {tags?.length > 0 ? (
        <Box>
          {tags.map((tag) => (
            <Button
              key={`tag-${tag}`}
              size="xs"
              colorScheme="gray"
              onClick={() => navigate(`/search?tag=${tag}`)}
            >
              {tag}
            </Button>
          ))}
        </Box>
      ) : null}
    </VStack>
  );
}
