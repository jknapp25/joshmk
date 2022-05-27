import React, { useState, useEffect } from "react";
import useIsMounted from "../lib/useIsMounted";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import ImageSlider from "./ImageSlider";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import ItemBuyButton from "./ItemBuyButton";
export default ItemPreview;

function ItemPreview({ item = {}, ...props }) {
  const [realItem, setRealItem] = useState(item);

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

  let { name, description, category, images, createdAt } = realItem;

  description = description ? JSON.parse(description) : description;

  return (
    <div className="row gx-0 py-3">
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

          <ItemBuyButton
            isForSale={item.isForSale}
            isSold={item.isSold}
            price={item.price}
            classes="my-2"
          />
        </div>
      </div>
    </div>
  );
}
