import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import { Heading, VStack } from "@chakra-ui/react";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

import useIsMounted from "../lib/useIsMounted";
import GalleryImage from "../components/GalleryImage";

export default Gallery;

function Gallery() {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();
  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const itemsData = await API.graphql({ query: queries.listItems });
      const items = itemsData.data.listItems.items;

      if (isMounted.current) setItems(items);
    }
    fetchData();
  }, [isMounted]);

  if (!items || items.length === 0) return null;

  const sortedItems = items.sort((a, b) => {
    const aSortVal = a.createdAt;
    const bSortVal = b.createdAt;
    if (aSortVal < bSortVal) {
      return 1;
    } else if (bSortVal < aSortVal) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <Row className="gx-5">
      {sortedItems.map((item, i) => (
        <Col
          key={`gallery-item-${i}`}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="d-flex align-self-center mb-5"
        >
          <Card
            className="border-0 text-center cursor-pointer mx-auto"
            onClick={() => navigate(`/item/${item.id}`)}
          >
            <VStack spacing={5}>
              <GalleryImage image={item.images[0]} />
              <Heading size="md">{item.name}</Heading>
            </VStack>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
