import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { API } from "aws-amplify";
import { useParams } from "react-router-dom";

import ImageCarousel from "./ImageCarousel";
import Tag from "./Tag";
import { createTimeInfo, statusColorLookup } from "../lib/utils";
import useIsMounted from "../lib/useIsMounted";
import * as queries from "../graphql/queries";

export default Project;

function Project({ project = {} }) {
  const [realProject, setRealProject] = useState(project);
  const isMounted = useIsMounted();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const projectData = await API.graphql({
        query: queries.getProject,
        variables: { id: params.id },
      });

      if (projectData && isMounted.current) {
        setRealProject(projectData.data.getProject);
      }
    }
    if (params.id) {
      fetchData();
    }
  }, [params.id, isMounted]);

  if (!realProject) return null;

  const { name, tags, summary, status, link, images, start, end } = realProject;
  const timeInfo = createTimeInfo(start, end, null, false);

  return (
    <>
      <ImageCarousel
        images={images}
        classes="rounded bg-secondary bg-opacity-10 shadow-lg"
      />

      <h4>
        {link ? (
          <a href={link} target="_blank" rel="noreferrer noopener">
            {name}
          </a>
        ) : (
          name
        )}
        {status ? (
          <Badge bg={statusColorLookup[status]} className="ms-2">
            {status}
          </Badge>
        ) : null}{" "}
      </h4>
      {summary ? <div className="font-weight-normal">{summary}</div> : null}
      <div className="mt-2">
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
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      )}
    </>
  );
}
