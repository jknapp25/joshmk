import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Masonry from "react-masonry-css";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import useIsMounted from "../lib/useIsMounted";
import ImageCarousel from "./ImageCarousel";
import ItemBuyButton from "./ItemBuyButton";
export default Gallery;

const BREAKPOINT_COLS = {
  default: 3,
  992: 3,
  768: 2,
  576: 1,
};

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
    <Masonry
      breakpointCols={BREAKPOINT_COLS}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {sortedItems.map((item, i) => (
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
    </Masonry>
  );
}
