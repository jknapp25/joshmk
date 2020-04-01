import React from "react";
import Item from "./Item";
export default Feed;

function Feed({ content }) {
  return content.map((item, i) => (
    <Item item={item} bottomMargin={"mb-4"} key={i} />
  ));
}
