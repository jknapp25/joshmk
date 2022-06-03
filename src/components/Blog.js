import React, { useState, useEffect } from "react";

import { useScroll } from "../lib/useScroll";
import ItemList from "./ItemList";

export default Blog;

function Blog() {
  const [displayMore, setDisplayMore] = useState(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const bottom =
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setDisplayMore(true);
    }
  }, [scrollY]);

  // console.log('window inner height: ', window.innerHeight);
  // console.log('document Element client hieght: ', document.documentElement.clientHeight);
  // console.log('document Element scroll hieght: ', document.documentElement.scrollHeight);
  // console.log('document Element offset height: ', document.documentElement.offsetHeight);
  // console.log('document element scrolltop: ', document.documentElement.scrollTop);
  // console.log('window page Y Offset: ', window.pageYOffset);
  // console.log('window document body offsetheight: ', window.document.body.offsetHeight);

  return <ItemList displayMore={displayMore} setDisplayMore={setDisplayMore} />;
}
