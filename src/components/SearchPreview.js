import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import MiniImage from "./MiniImage";

export default SearchPreview;

function SearchPreview({ thing = {}, type, borderTop }) {
  const navigate = useNavigate();

  let { id, title, images, createdAt } = thing;
  const date = moment(createdAt).format("dddd, MMM D, YYYY");

  return (
    <div
      className={`row gx-0 cursor-pointer py-4 border-bottom ${
        borderTop ? "border-top" : ""
      }`}
      onClick={() => navigate(`/${type}/${id}`)}
    >
      <div className="col my-auto">
        <div>
          <h3 className="mb-1 fw-bold">{title}</h3>
          <small className="text-muted">{date}</small>
        </div>
      </div>
      <div className="col-auto ms-2">
        <MiniImage images={images} />
      </div>
    </div>
  );
}
