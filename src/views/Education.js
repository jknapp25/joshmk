import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@chakra-ui/react";
import { createTimeInfo } from "../lib/utils";
import useIsMounted from "../lib/useIsMounted";
import * as queries from "../graphql/queries";

export default Education;

function Education({ education }) {
  const [realEducation, setRealEducation] = useState(education);

  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const educationData = await API.graphql({
        query: queries.getEducation,
        variables: { id: params.id },
      });

      if (educationData && isMounted.current) {
        setRealEducation(educationData.data.getEducation);
      }
    }
    if (params.id) {
      fetchData();
    }
  }, [params.id, isMounted]);

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
      {tags?.length > 0 &&
        tags.map((tag) => (
          <Button
            key={tag}
            size="xs"
            colorScheme="gray"
            onClick={() => navigate(`/search?tag=${tag}`)}
          >
            {tag}
          </Button>
        ))}
    </>
  );
}
