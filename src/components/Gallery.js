import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Masonry from "react-masonry-css";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { useIsMounted } from "../lib/utils";
import ImageCarousel from "./ImageCarousel";
import BuyModal from "./BuyModal";
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
          {item.isForSale ? (
            <div className="mb-2">
              {item.isSold ? (
                <>
                  <Button
                    variant="secondary"
                    className="d-inline me-2"
                    disabled
                  >
                    Sold
                  </Button>
                  <div className="text-secondary d-inline align-middle">
                    ${item.price}
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="success"
                    className="d-inline me-2"
                    onClick={() => setShowModal(true)}
                  >
                    Buy
                  </Button>
                  <div className="text-success d-inline align-middle">
                    ${item.price}
                  </div>
                </>
              )}
            </div>
          ) : null}
        </Card>
      ))}
      <BuyModal showModal={showModal} setShowModal={setShowModal} />
    </Masonry>
  );
}
