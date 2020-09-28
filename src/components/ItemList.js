import React from "react";
import { Alert } from "react-bootstrap";
import Item from "./Item";
import Timeline from "./Timeline";
import { useLocation } from "@reach/router";
import resume from "../assets/resume.pdf";
export default ItemList;

const statusOrder = ["Active", "On Hold", "Complete"];

function ItemList({ items }) {
  const { pathname } = useLocation();

  const itemType = pathname.substring(1) || "blog";
  let filteredItems = items.filter((itm) => itm.tags.includes(itemType));

  if (itemType === "projects") {
    filteredItems = filteredItems.sort(
      (a, b) =>
        statusOrder.indexOf(a.badgeText) - statusOrder.indexOf(b.badgeText)
    );
  }

  if (itemType === "work") {
    return (
      <>
        <Alert variant="info">
          Click{" "}
          <Alert.Link href={resume} download="Josh_Knapp_Resume">
            here
          </Alert.Link>{" "}
          for Josh's resume
        </Alert>
        <Timeline items={filteredItems} />
      </>
    );
  } else {
    return filteredItems.map((item, i) => (
      <Item item={item} bottomMargin="mb-4" key={i} />
    ));
  }
}
