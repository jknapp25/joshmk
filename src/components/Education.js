import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import { createTimeInfo } from "../lib/utils";
import useIsMounted from "../lib/useIsMounted";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
export default Education;

function Education({ education, ...props }) {
  const [realEducation, setRealEducation] = useState(education);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      const educationData = await API.graphql({
        query: queries.getEducation,
        variables: { id: props.id },
      });

      if (educationData && isMounted.current) {
        setRealEducation(educationData.data.getEducation);
      }
    }
    if (props.id) {
      fetchData();
    }
  }, [props.id, isMounted]);

  if (!realEducation) return null;

  const {
    organization,
    degree,
    location,
    summary,
    details,
    organizationUrl,
    tags,
    start,
    end,
  } = realEducation;

  const timeInfo = createTimeInfo(start, end, null, false);

  return (
    <>
      <h4>{degree}</h4>
      <h5 className="text-muted mb-2">
        {organization ? (
          <a
            href={organizationUrl || ""}
            target="_blank"
            rel="noreferrer noopener"
          >
            {organization}
          </a>
        ) : (
          organization
        )}{" "}
        {location && `- ${location}`}
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
        <div
          className={`${
            tags && tags.length > 0 ? "mb-2" : ""
          } font-weight-normal`}
        >
          <ul>
            {details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="mb-2">
        <small className="text-muted">{timeInfo}</small>
      </div>
      {tags &&
        tags.length > 0 &&
        tags.map((tag, i) => <Tag key={tag} tag={tag} />)}
    </>
  );
}
