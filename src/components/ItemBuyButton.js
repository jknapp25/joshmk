import React, { useState } from "react";
import { Button } from "react-bootstrap";

import BuyModal from "./BuyModal";

export default ItemBuyButton;

function ItemBuyButton({ isForSale, isSold, price, classes }) {
  const [showModal, setShowModal] = useState(false);

  if (!isForSale) return null;

  const buttonVariant = isSold ? "secondary" : "success";
  const isDisabled = !!isSold;
  const priceColorClass = isSold ? "text-secondary" : "text-success";
  const buttonText = isSold ? "Sold" : "Buy";

  function handleButtonClick() {
    if (isSold) return;

    setShowModal(true);
  }

  return (
    <div className={classes}>
      <Button
        variant={buttonVariant}
        className="d-inline me-2"
        disabled={isDisabled}
        onClick={handleButtonClick}
      >
        {buttonText}
      </Button>
      <div className={`${priceColorClass} d-inline align-middle`}>${price}</div>
      <BuyModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
