import React, { useState, useEffect } from "react";
import useIsMounted from "../lib/useIsMounted";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

import ImageCarousel from "./ImageCarousel";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import ItemBuyButton from "./ItemBuyButton";
import Category from "./Category";
import NewBadge from "./NewBadge";

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
          <div className="mb-4">
            <NewBadge createdAt={createdAt} />
            <Category category={category} />
            <h1 className="mb-1 display-5">
              <span className="cursor-pointer fw-bold">{name}</span>
            </h1>
          </div>

          <ImageCarousel
            images={images}
            classes="mb-4 rounded bg-secondary bg-opacity-10 shadow-lg"
          />

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
