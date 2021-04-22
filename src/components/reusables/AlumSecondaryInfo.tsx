import { CuratedAlum } from "models";
import React from "react";
import { createCommaSeparatedList } from "utilities";

interface AlumSecondaryInfoProps {
  /** The alum whose details should be displayed. */
  alum: CuratedAlum;
  /** Whether the details should be shown in a row or column. */
  direction?: "row" | "column";
}

/** Reusable component to display secondary information for an alum. */
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
          {createCommaSeparatedList(alum.majors)}
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
