import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import MiniImage from "./MiniImage";

export default SearchPreview;

function SearchPreview({ thing = {}, type, borderTop }) {
  const navigate = useNavigate();

  let { id, title, images, createdAt } = thing;
  const date = createdAt ? moment(createdAt).format("MMM D") : null;

  return (
    <div
      className={`row gx-0 cursor-pointer py-4 border-bottom ${borderTop ? 'border-top' : ''}`}
      onClick={() => navigate(`/${type}/${id}`)}
    >
      <div className="col my-auto">
        <div>
          <h4 className="mb-0 fw-bold">{title}</h4>
          <small className="text-muted">{date}</small>
        </div>
      </div>
      <div className="col-auto">
        <MiniImage images={images} />
      </div>
    </div>
  );
}
