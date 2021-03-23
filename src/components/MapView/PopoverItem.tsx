import genericAvatar from "assets/images/generic_avatar.jpg";
import placeholderImg from "assets/images/placeholder_img.jpg";
import { HandshakeCareer, Mappable, PeopleGroveAlum } from "models";
import React, { useCallback } from "react";
import { useAsync } from "react-async";
import { Col, Row, Spinner } from "react-bootstrap";
import Img from "react-cool-img";
import { getPeopleGroveAlum } from "services";
import { commaSeparatedList } from "utilities";

interface PopoverItemProps<I extends Mappable> {
  item: I;
}

export function PopoverItem<I extends Mappable>({ item }: PopoverItemProps<I>): JSX.Element {
  switch (item.type) {
    case "alum": {
      const alum = (item as unknown) as PeopleGroveAlum;
      return <AlumPopoverItem alum={alum} />;
    }
    case "career": {
      const job = (item as unknown) as HandshakeCareer;
      // TODO: move this to its own component, similar to AlumPopoverItem
      return (
        <Row className="job-popover-item">
          <Col xs={3} className="d-flex align-items-center">
            <div>
              <Img
                src={job.employer_logo_url}
                placeholder={placeholderImg}
                width="100%"
                loading="lazy"
              />
            </div>
          </Col>
          <Col className="d-flex align-items-center">
            <div>
              <h4>{job.job_name}</h4>
              <div className="secondary-info d-flex flex-column">
                {job.employer_name && (
                  <span>
                    <i className="fas fa-briefcase" />
                    {job.employer_name}
                  </span>
                )}
                {job.employment_type_name && (
                  <span>
                    <i className="fas fa-clock" />
                    {job.employment_type_name}
                  </span>
                )}
                {job.job_city && (
                  <span>
                    <i className="fas fa-location-arrow" />
                    {job.job_city}
                  </span>
                )}
              </div>
            </div>
          </Col>
        </Row>
      );
    }
    default:
      return <span>#{item.id}</span>;
  }
}

interface AlumPopoverItemProps {
  alum: PeopleGroveAlum;
}

function AlumPopoverItem({ alum }: AlumPopoverItemProps): JSX.Element {
  const promiseFn = useCallback(() => getPeopleGroveAlum(alum.identifier), [alum.identifier]);
  const { data, isPending } = useAsync({ promiseFn });

  return (
    <Row className="alum-popover-item">
      <Col xs={3} className="d-flex align-items-center">
        <div className="img-circle-container">
          <Img
            src={alum.photoUrl}
            placeholder={genericAvatar}
            alt={`${alum.firstName} ${alum.lastName}`}
            width="100%"
            lazy
          />
        </div>
      </Col>
      <Col className="d-flex align-items-center">
        <div>
          <h4>{`${alum.firstName} ${alum.lastName}`}</h4>
          <div className="secondary-info d-flex flex-column">
            {alum.majors?.length > 0 && (
              <span>
                <i className="fas fa-graduation-cap" />
                {commaSeparatedList(alum.majors)}
              </span>
            )}
            {isPending ? (
              <Spinner animation="border" variant="secondary" size="sm" />
            ) : (
              data?.workHistory[0] && (
                <span>
                  <i className="fas fa-briefcase" />
                  {data.workHistory[0].companyTitle}
                </span>
              )
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}
