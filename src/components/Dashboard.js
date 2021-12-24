import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ItemList from "./ItemList";
import SideNavNew from "./SideNavNew";
import DashboardUserSummary from "./DashboardUserSummary";
import { Helmet } from "react-helmet";
import { API } from "aws-amplify";
import DashboardTags from "./DashboardTags";
export default Dashboard;

function sortByFrequencyAndRemoveDuplicates(array) {
  let frequency = {};
  let value;

  // compute frequencies of each value
  for (var i = 0; i < array.length; i++) {
    value = array[i];
    if (value in frequency) {
      frequency[value]++;
    } else {
      frequency[value] = 1;
    }
  }

  // make array from the frequency object to de-duplicate
  var uniques = [];
  for (value in frequency) {
    uniques.push(value);
  }

  // sort the uniques array in descending order by frequency
  function compareFrequency(a, b) {
    return frequency[b] - frequency[a];
  }

  return uniques.sort(compareFrequency);
}

function Dashboard({ config, faviconUrl, avatarUrl }) {
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

  return (
    <Container fluid className="dashboard-container hidden-xs">
      <Helmet>
        <title>{config.fullName || ""}</title>
        <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
      </Helmet>
      <Row>
        <Col lg={3} className="hidden-sm p-0">
          <div className="border-bottom bg-light">
            <DashboardUserSummary config={config} avatarUrl={avatarUrl} />
          </div>
          <SideNavNew pages={config.pagesCustom} />
        </Col>
        <Col
          lg={6}
          className="hidden-sm p-5 border-start border-end vh-100 overflow-scroll"
        >
          <small className="text-dark">LATEST WRITINGS</small>
          <div className="border-bottom"></div>
          <ItemList mini />
        </Col>
        <Col lg={3} className="hidden-sm p-5">
          <DashboardTags tags={tags} />
        </Col>
      </Row>
    </Container>
  );
}
