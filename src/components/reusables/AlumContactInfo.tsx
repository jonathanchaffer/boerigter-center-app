import { CuratedAlum } from "models";
import React from "react";
import { standardizedPhoneNumber } from "utilities";

interface AlumContactInfoProps {
  /** The alum whose details should be displayed. */
  alum: CuratedAlum;
}

/** Reusable component to display contact information for an alum. */
export function AlumContactInfo({ alum }: AlumContactInfoProps): JSX.Element {
  return (
    <div className="secondary-info d-flex flex-column">
      {alum.website && (
        <span>
          <i className="fas fa-globe-americas" />
          {alum.website}
        </span>
      )}
      {alum.linkedIn && (
        <span>
          <i className="fab fa-linkedin-in" />
          {alum.linkedIn}
        </span>
      )}
      {alum.email && (
        <span>
          <i className="fas fa-envelope" />
          {alum.email}
        </span>
      )}
      {alum.phone && (
        <span>
          <i className="fas fa-phone-alt" />
          {standardizedPhoneNumber(alum.phone)}
        </span>
      )}
    </div>
  );
}
