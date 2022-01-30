import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Masonry from "react-masonry-css";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { useIsMounted } from "../lib/utils";
import ImageCarousel from "./ImageCarousel";
import BuyModal from "./BuyModal";
import ItemBuyButton from "./ItemBuyButton";
export default Gallery;

function Gallery() {
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
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {items.map((item, i) => (
        <Card key={i} className="border-0">
          <ImageCarousel
            images={item.images}
            classes="rounded bg-secondary bg-opacity-10 shadow-lg"
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
      <BuyModal showModal={showModal} setShowModal={setShowModal} />
    </Masonry>
  );
}
