import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useIsMounted } from "../lib/utils";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import ImageSlider from "./ImageSlider";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import BuyModal from "./BuyModal";
export default ItemPreview;

/**
 *
 * Add item previewing to images
 * Add image description
 * Hide scroller
 * Add scroll arrows
 */

function ItemPreview({ item = {}, ...props }) {
  const [realItem, setRealItem] = useState(item);

  const [showModal, setShowModal] = useState(false);

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const itemData = await API.graphql({
        query: queries.getItem,
        variables: { id: props.id },
      });

      if (itemData && isMounted.current) {
        setRealItem(itemData.data.getItem);
      }
    }
    if (props.id) {
      fetchData();
    }
  }, [props.id, isMounted]);

  if (!realItem) return null;

  let { id, name, description, category, images, createdAt, price, isForSale } =
    realItem;
  const date = createdAt;

  description = description ? JSON.parse(description) : description;

  return (
    <div className="row gx-0 py-3 border-bottom">
      <div className="col my-auto">
        <div>
          {category ? (
            <div className="mb-1">
              <small className="text-muted text-uppercase">{category}</small>
            </div>
          ) : null}
          <ImageSlider images={images} classes="mb-3" />
          <h4 className="mb-2 fw-bold">{name}</h4>
          {description ? (
            <RichTextEditor
              value={description}
              onChange={() => {}}
              readOnly={true}
            />
          ) : null}

          {isForSale ? (
            <div className="my-2">
              <Button
                variant="success"
                className="d-inline me-2"
                onClick={() => setShowModal(true)}
              >
                Buy
              </Button>
              <div className="text-success d-inline align-middle">${price}</div>
            </div>
          ) : null}
        </div>
      </div>
      <BuyModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
