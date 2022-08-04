import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Masonry from "react-masonry-css";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { useIsMounted } from "../lib/utils";
import ImageCarousel from "../components/ImageCarousel";
import ItemBuyButton from "../components/ItemBuyButton";
import SideNavNew from "../components/SideNavNew";
export default GalleryView;

function GalleryView() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <Container fluid style={{ maxWidth: "1440px" }}>
      <Row>
        <Col lg={3} className="p-0 vh-100 d-flex align-items-center sticky">
          <div className="p-5">
            <SideNavNew />
          </div>
        </Col>
        <Col lg={9} className="p-5">
          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {items.map((item, i) => (
              <Card key={i} className="border-0">
                <ImageCarousel
                  images={item.images}
                  classes="bg-secondary bg-opacity-10"
                />
                <h5 className="my-2">{item.name}</h5>
                <ItemBuyButton
                  isForSale={item.isForSale}
                  isSold={item.isSold}
                  price={item.price}
                  classes="mb-2"
                />
              </Card>
            ))}
          </Masonry>
        </Col>
      </Row>
    </Container>
  );
}
