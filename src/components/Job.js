import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { createTimeInfo } from "../lib/utils";
import Tag from "./Tag";
import useIsMounted from "../lib/useIsMounted";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
export default Job;

function Job({ job = {}, ...props }) {
  const [realJob, setRealJob] = useState(job);
  const isMounted = useIsMounted();

  const {
    company,
    role,
    location,
    summary,
    details,
    companyUrl,
    tags,
    type,
    start,
    end,
  } = realJob;

  useEffect(() => {
    async function fetchData() {
      const postData = await API.graphql({
        query: queries.getJob,
        variables: { id: props.id },
      });

      if (postData && isMounted.current) {
        setRealJob(postData.data.getJob);
      }
    }
    if (props.id) {
      fetchData();
    }
  }, [props.id, isMounted]);

  const timeInfo = createTimeInfo(start, end, null, false);

  return (
    <>
      <h4>
        {role}
        {type === "contract" ? (
          <Badge variant="secondary" className="ml-2">
            Contract
          </Badge>
        ) : null}
      </h4>
      <h5 className="text-muted mb-2">
        {companyUrl ? (
          <a href={companyUrl || ""} target="_blank" rel="noreferrer noopener">
            {company}
          </a>
        ) : (
          company
        )}{" "}
        {companyUrl && location ? " - " : null}
        {location || null}
      </h5>
      {summary ? (
        <div
          className={`${
            tags && tags.length > 0 ? "mb-2" : ""
          } font-weight-normal`}
        >
          {summary}
        </div>
      ) : null}
      {details && details.length > 0 ? (
        <ul>
          {details.map((detail, i) => (
            <li key={`detail-${i}`}>{detail}</li>
          ))}
        </ul>
      ) : null}
      <div>
        <small className="text-muted">{timeInfo}</small>
      </div>
      {tags && tags.length > 0 && (
        <div
          style={{
            whiteSpace: "nowrap",
            overflowX: "scroll",
            boxShadow: "",
          }}
          className="mt-1"
        >
          {tags.map((tag, i) => (
            <Tag tag={tag} key={`tag-${i}`} />
          ))}
        </div>
      )}
    </>
  );
}
