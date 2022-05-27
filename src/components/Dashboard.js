import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { API } from "aws-amplify";

import { useScroll } from "../lib/useScroll";
import ItemList from "./ItemList";
import SideNavNew from "./SideNavNew";
import DashboardUserSummary from "./DashboardUserSummary";
import DashboardTags from "./DashboardTags";
import MobileNav from "./MobileNav";
import sortByFrequencyAndRemoveDuplicates from '../lib/sortByFrequencyAndRemoveDuplicates';

export default Dashboard;

function Dashboard({ config, faviconUrl, avatarUrl }) {
  const [tags, setTags] = useState(null);
  const [displayMore, setDisplayMore] = useState(null);
  const { scrollY } = useScroll();

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

  return (
    <Container fluid style={{ maxWidth: "1440px" }}>
      <MobileNav 
        fullName={config.fullName}
      />
      <Helmet>
        <title>{config.fullName || ""}</title>
        <link rel="icon" type="image/png" href={faviconUrl} sizes="16x16" />
      </Helmet>
      <Row>
        <Col
          lg={3}
          className="p-0 vh-100 d-none d-lg-flex align-items-center sticky"
        >
          <div className="p-5">
            <SideNavNew classes="mb-5" />
            <DashboardTags tags={tags} />
          </div>
        </Col>
        <Col lg={6} className="p-4 p-lg-5">
          <ItemList displayMore={displayMore} setDisplayMore={setDisplayMore} />
        </Col>
        <Col
          lg={3}
          className="p-0 vh-100 d-none d-lg-flex align-items-center sticky"
        >
          <div className="p-5">
            <DashboardUserSummary config={config} avatarUrl={avatarUrl} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
