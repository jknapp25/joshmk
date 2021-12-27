import React from "react";
import { navigate } from "@reach/router";
import { Image } from "react-bootstrap";
export default DashboardUserSummary;

function DashboardUserSummary({ config, avatarUrl }) {
  return (
    <div className="p-5">
      <div className="ratio ratio-1x1 mb-4 bg-secondary bg-opacity-10">
        {avatarUrl ? (
          <Image
            className="w-100"
            style={{ objectFit: "cover" }}
            src={avatarUrl}
            fluid
            onClick={() => navigate("/")}
          />
        ) : null}
      </div>
      <h2 className="mb-0" onClick={() => navigate("/")}>
        {config.fullName || ""}
      </h2>
      <br />
      {config.tagline}
    </div>
  );
}
