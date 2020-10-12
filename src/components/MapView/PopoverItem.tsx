import { Alum, Mappable } from "models";
import React from "react";
import { Col, Row } from "react-bootstrap";

interface PopoverItemProps<I extends Mappable> {
  item: I;
}

export function PopoverItem<I extends Mappable>({ item }: PopoverItemProps<I>): JSX.Element {
  switch (item.type) {
    case "alum": {
      const alum = (item as unknown) as Alum;
      return (
        <Row className="alum-popover-item">
          <Col xs={3} className="d-flex align-items-center">
            <img
              src={alum.photoUrl}
              alt={`${alum.firstName} ${alum.lastName}`}
              width="100%"
              loading="lazy"
            />
          </Col>
          <Col className="d-flex align-items-center">
            <div>
              <h4>{`${alum.firstName} ${alum.lastName}`}</h4>
              {alum.majors && (
                <span>
                  {alum.majors.map((major, index) => (
                    <span key={major}>
                      {major}
                      {index !== alum.majors.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </Col>
        </Row>
      );
    }
    default:
      return <span>#{item.id}</span>;
  }
}
