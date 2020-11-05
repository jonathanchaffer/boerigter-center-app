import { CuratedAlum } from "models";
import React from "react";
import { commaSeparatedList } from "utilities";

interface AlumSecondaryInfoProps {
  alum: CuratedAlum;
  direction?: "row" | "column";
}

export function AlumSecondaryInfo({ alum, direction }: AlumSecondaryInfoProps): JSX.Element {
  return (
    <div className={`secondary-info d-flex flex-${direction || "row"}`}>
      {alum.location && (
        <span>
          <i className="fas fa-location-arrow" />
          {alum.location}
        </span>
      )}
      {alum.majors && (
        <span>
          <i className="fas fa-graduation-cap" />
          {commaSeparatedList(alum.majors)}
        </span>
      )}
      {alum.company && (
        <span>
          <i className="fas fa-briefcase" />
          {alum.company}
        </span>
      )}
    </div>
  );
}
