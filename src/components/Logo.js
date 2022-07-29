import React, { useState, useContext, useEffect } from "react";
import { Storage } from "aws-amplify";

import { ConfigContext } from "../App";
import useIsMounted from "../lib/useIsMounted";

export default Logo;

function Logo({ handlePageClick }) {
  const [logoUrl, setLogoUrl] = useState("");
  const config = useContext(ConfigContext);

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const logoUrl = await Storage.get(config.logo);
      if (logoUrl && isMounted.current) setLogoUrl(logoUrl);
    }
    if (config.logo) {
      fetchData();
    }
  }, [config.logo, isMounted]);

  return (
    <>
      {logoUrl ? (
        <>
          <img
            className="d-none d-lg-inline cursor-pointer"
            style={{ height: "40px" }}
            alt="Website logo"
            src={logoUrl}
            onClick={() => handlePageClick("/")}
          />
          <img
            className="d-md-inline d-lg-none cursor-pointer"
            style={{ height: "30px" }}
            alt="Website logo"
            src={logoUrl}
            onClick={() => handlePageClick("/")}
          />
        </>
      ) : config.fullName && !config.logo ? (
        <h1 className="mb-0 text-nowrap">{config.fullName}</h1>
      ) : null}
    </>
  );
}
