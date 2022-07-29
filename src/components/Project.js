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

  const { name, tags, summary, status, images, start, end } = realProject;
  const timeInfo = createTimeInfo(start, end, null, false);

  return (
    <div className="pb-3">
      <div className="mb-4">
        {status ? <Badge bg={statusColorLookup[status]}>{status}</Badge> : null}
        <h1 className="mb-1 display-5">
          <span className="cursor-pointer fw-bold">{name}</span>
        </h1>
      </div>

      <ImageCarousel
        images={images}
        classes="mb-4 rounded bg-secondary bg-opacity-10 shadow-lg"
      />

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
    </div>
  );
}
