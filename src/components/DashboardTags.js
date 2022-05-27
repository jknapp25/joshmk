import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";

import Tag from "./Tag";
import sortByFrequencyAndRemoveDuplicates from '../lib/sortByFrequencyAndRemoveDuplicates';

export default DashboardTags;

function DashboardTags() {
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
      const topTags = sorted.slice(0, 12);

      setTags(topTags);
    }

    fetchData();
  }, []);

  if (!tags || tags.length === 0) return null;
  
  return (
    <>
      <div className="mb-2">
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
