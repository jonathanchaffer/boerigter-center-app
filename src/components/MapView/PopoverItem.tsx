import genericAvatar from "assets/images/generic_avatar.jpg";
import { Mappable, PeopleGroveAlum } from "models";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Img from "react-cool-img";
import { getPeopleGroveAlum } from "services";
import { commaSeparatedList } from "utilities";

interface PopoverItemProps<I extends Mappable> {
  item: I;
}

export function PopoverItem<I extends Mappable>({ item }: PopoverItemProps<I>): JSX.Element {
  const [detailedAlum, setDetailedAlum] = useState<PeopleGroveAlum | undefined>(undefined);

  // In case any additional data needs to be retrieved once the popover item shows up.
  useEffect(() => {
    switch (item.type) {
      case "alum": {
        const alum = (item as unknown) as PeopleGroveAlum;
        getPeopleGroveAlum(alum.identifier).then(alumDetails => {
          console.log(alumDetails);
          setDetailedAlum(alumDetails);
        });
        break;
      }
      default: {
        break;
      }
    }
  }, [item]);

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
              <div className="secondary-info d-flex flex-column">
                {alum.majors?.length > 0 && (
                  <span>
                    <i className="fas fa-graduation-cap" />
                    {commaSeparatedList(alum.majors)}
                  </span>
                )}
                {detailedAlum?.workHistory[0] && (
                  <span>
                    <i className="fas fa-briefcase" />
                    {detailedAlum.workHistory[0].companyTitle}
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
