import genericAvatar from "assets/images/generic_avatar.jpg";
import { HandshakeCareer, Mappable, PeopleGroveAlum } from "models";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Img from "react-cool-img";
import { commaSeparatedList } from "utilities";

interface PopoverItemProps<I extends Mappable> {
  item: I;
}

export function PopoverItem<I extends Mappable>({ item }: PopoverItemProps<I>): JSX.Element {
  switch (item.type) {
    case "alum": {
      const alum = (item as unknown) as PeopleGroveAlum;
      return (
        <Row className="alum-popover-item">
          <Col xs={3} className="d-flex align-items-center">
            <div className="img-circle-container">
              <Img
                src={alum.photoUrl}
                placeholder={genericAvatar}
                alt={`${alum.firstName} ${alum.lastName}`}
                width="100%"
                loading="lazy"
              />
            </div>
          </Col>
          <Col className="d-flex align-items-center">
            <div>
              <h4>{`${alum.firstName} ${alum.lastName}`}</h4>
              {alum.majors && <span>{commaSeparatedList(alum.majors)}</span>}
            </div>
          </Col>
        </Row>
      );
    }
    case "career": {
      const job = (item as unknown) as HandshakeCareer;
      return (
        <Row className="alum-popover-item">
          <Col xs={3} className="d-flex align-items-center">
            <div className="img-circle-container">
              <Img
                src={job.employer_logo_url}
                placeholder={genericAvatar}
                width="100%"
                loading="lazy"
              />
            </div>
          </Col>
          <Col>
            <div>
              <h4>{`${job.job_name}`}</h4>
              <p>{`${job.employer_name}`}</p>
              <p>{`${job.employment_type_name}`}</p>
            </div>
          </Col>
        </Row>
      )
      break;
    }
    default:
      return <span>#{item.id}</span>;
  }
}
