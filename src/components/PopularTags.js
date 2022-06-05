import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";

import Tag from "./Tag";
import sortByFrequencyAndRemoveDuplicates from "../lib/sortByFrequencyAndRemoveDuplicates";

export default PopularTags;

function PopularTags() {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const categories = await API.graphql({
        query: `query ListTags {
          listPosts(filter: {tags: {size: {gt: 0}}}) {
            items {
              tags
            }
          }
        }        
      `,
      });
      const preppedTags = categories.data.listPosts.items.reduce(
        (acc, curr) => [...acc, ...curr.tags],
        []
      );
      const sorted = sortByFrequencyAndRemoveDuplicates(preppedTags);
      
      const removeList = ["short story", "poetry", "drawing", "fiction"];
      const withoutRemovedOnes = sorted.filter(
        (tag) => !removeList.includes(tag)
      );
      
      const topTags = withoutRemovedOnes.slice(0, 6);


      setTags(topTags);
    }

    fetchData();
  }, []);

  if (!tags || tags.length === 0) return null;

  return (
    <>
      <div className="mb-2">
        <small className="text-dark text-uppercase">popular topics</small>
      </div>
      <div>
        {tags.map((tag) => (
          <Tag key={`tag-${tag}`} tag={tag} />
        ))}
      </div>
    </>
  );
}
