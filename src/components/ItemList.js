import React from "react";
import { Alert } from "react-bootstrap";
import Item from "./Item";
import Timeline from "./Timeline";
import Resume from "./Resume";
import { useLocation } from "@reach/router";
import { parse } from "query-string";
import { PDFDownloadLink } from "@react-pdf/renderer";
export default ItemList;

const statusOrder = ["Active", "On Hold", "Complete"];

function ItemList({ items }) {
  const { pathname, search } = useLocation();
  const searchParams = parse(search);

  let itemType = pathname.substring(1) || "blog";

  if (searchParams.search) itemType = searchParams.search;

  let filteredItems = items
    .filter((itm) => itm.tags.includes(itemType))
    .sort(function (a, b) {
      if (a.end < b.end) {
        return 1;
      } else if (b.end < a.end) {
        return -1;
      } else {
        return 0;
      }
    });
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
      <Item key={i} item={item} bottomMargin="mb-4" />
    ));
  }
}
