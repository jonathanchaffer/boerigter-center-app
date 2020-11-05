import { CuratedAlum } from "models";
import React from "react";
import { standardizedPhoneNumber } from "utilities";

interface AlumContactInfoProps {
  alum: CuratedAlum;
}

// TODO: probably want to disable links to outside sites when the app is run in the Boerigter Center
export function AlumContactInfo({ alum }: AlumContactInfoProps): JSX.Element {
  return (
    <div className="secondary-info d-flex flex-column">
      {alum.website && (
        <a href={alum.website} target="blank">
          <i className="fas fa-globe-americas" />
          {alum.website}
        </a>
      )}
      {alum.linkedIn && (
        <a href={alum.linkedIn} target="blank">
          <i className="fab fa-linkedin-in" />
          LinkedIn Profile
        </a>
      )}
      {alum.email && (
        <a href={`mailto:${alum.email}`} target="blank">
          <i className="fas fa-envelope" />
          {alum.email}
        </a>
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
