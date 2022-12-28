import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import useIsMounted from "../lib/useIsMounted";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

import ImageCarousel from "./ImageCarousel";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import ItemBuyButton from "./ItemBuyButton";
import { Tag } from "@chakra-ui/react";

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
    <Row className="gx-5 d-flex justify-content-center">
      <Col md="10">
        <Row className="mb-5">
          <Col className="d-flex justify-content-center">
            <ImageCarousel images={images} isItem />
          </Col>
        </Row>
        <Row className="mb-2 d-flex justify-content-center">
          <Col md="6">
            <h1 className="mb-4 text-center">{name}</h1>

            <ItemBuyButton
              isForSale={isForSale}
              isSold={isSold}
              price={price}
              classes="mt-2 text-center mb-5"
            />

            {description ? (
              <>
                <h4>Description</h4>
                <RichTextEditor
                  value={description}
                  onChange={() => {}}
                  readOnly={true}
                />
              </>
            ) : null}

            {tags?.length > 0 ? (
              <>
                <h4 className="mt-4">Tags</h4>
                <div className="border-0 py-0">
                  {tags.map((tag) => (
                    <Tag
                      key={`tag-${tag}`}
                      size="sm"
                      cursor="pointer"
                      onClick={() => navigate(`/search?tag=${tag}`)}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              </>
            ) : null}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
