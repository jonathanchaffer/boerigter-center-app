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
