import genericAvatar from "assets/images/generic_avatar.jpg";
import { Mappable, PeopleGroveAlum } from "models";
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
            <Img
              src={alum.photoUrl}
              placeholder={genericAvatar}
              alt={`${alum.firstName} ${alum.lastName}`}
              width="100%"
              loading="lazy"
            />
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
    default:
      return <span>#{item.id}</span>;
  }
}
