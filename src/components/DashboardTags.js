import React from "react";
import Tag from "./Tag";
export default DashboardTags;

function DashboardTags({ tags }) {
  if (!tags || tags.length === 0) return null;
  return (
    <>
      <div className="mb-1">
        <small className="text-dark">POPULAR TAGS</small>
      </div>
      <div>
        {tags.map((tag) => (
          <Tag key={`tag-${tag}`} tag={tag} />
        ))}
      </div>
    </>
  );
}
