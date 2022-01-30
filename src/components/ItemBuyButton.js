import React from "react";
import { Button } from "react-bootstrap";
export default ItemBuyButton;

function ItemBuyButton({ isForSale, isSold, price, classes }) {
  if (!isForSale) return null;

  const buttonVariant = isSold ? "secondary" : "success";
  const isDisabled = !!isSold;
  const priceColorClass = isSold ? "text-secondary" : "text-success";

  return (
    <div className={classes}>
      <Button
        variant={buttonVariant}
        className="d-inline me-2"
        disabled={isDisabled}
      >
        Sold
      </Button>
      <div className={`${priceColorClass} d-inline align-middle`}>${price}</div>
    </div>
  );
}
