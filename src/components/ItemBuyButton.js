import React, { useState } from "react";
import { Button } from "react-bootstrap";

import BuyModal from "./BuyModal";

export default ItemBuyButton;

function ItemBuyButton({ isForSale, isSold, price, classes }) {
  const [showModal, setShowModal] = useState(false);

  if (!isForSale) return null;

  const buttonVariant = isSold ? "secondary" : "success";
  const isDisabled = !!isSold;
  const priceColorClass = isSold ? "text-secondary" : "text-dark";
  const buttonText = isSold ? "Sold" : "Buy now";

  function handleButtonClick() {
    if (isSold) return;

    setShowModal(true);
  }

  return (
    <div className={classes}>
      <Button
        variant={buttonVariant}
        className="d-inline me-2 px-4"
        disabled={isDisabled}
        onClick={handleButtonClick}
        size="lg"
      >
        {buttonText}
      </Button>
      {!isSold ? (
        <>
          <div className={`${priceColorClass} d-inline align-middle`}>
            ${price}
          </div>
          <BuyModal showModal={showModal} setShowModal={setShowModal} />
        </>
      ) : null}
    </div>
  );
}
