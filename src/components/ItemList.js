import React from "react";
import { Alert } from "react-bootstrap";
import Item from "./Item";
import Timeline from "./Timeline";
import Resume from "./Resume";
import { useLocation } from "@reach/router";
import { PDFDownloadLink } from "@react-pdf/renderer";
export default ItemList;

const statusOrder = ["Active", "On Hold", "Complete"];

function ItemList({ items }) {
  const { pathname } = useLocation();

  const itemType = pathname.substring(1) || "blog";
  let filteredItems = items.filter((itm) => itm.tags.includes(itemType));
  let education = items.filter((itm) => itm.tags.includes("education"));

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
          <PDFDownloadLink
            document={<Resume items={filteredItems} education={education} />}
            fileName="Josh_Knapp_Resume.pdf"
          >
            <span className="alert-link">here</span>
          </PDFDownloadLink>{" "}
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
