import genericAvatar from "assets/images/generic_avatar.jpg";
import { ErrorModal, PageContainer } from "components";
import { AlumContactInfo, AlumSecondaryInfo } from "components/reusables";
import React, { useCallback } from "react";
import { useAsync } from "react-async";
import { Col, Row, Spinner } from "react-bootstrap";
import Img from "react-cool-img";
import { useParams } from "react-router-dom";
import { getAlumStory } from "services";
import { fullName } from "utilities";

export function AlumStoryDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const promiseFn = useCallback(() => getAlumStory(id), [id]);
  const { data, error, isPending } = useAsync({ promiseFn });
  const alum = data;
  return (
    <PageContainer>
      <div className="alumni-stories-list">
        {isPending ? (
          <Spinner animation="border" />
        ) : (
          alum && (
            <Row>
              <Col xs={3}>
                <Img
                  src={alum.profilePhoto || ""}
                  placeholder={genericAvatar}
                  alt={`${alum.firstName} ${alum.lastName}`}
                  width="100%"
                  loading="lazy"
                  className="img-circle"
                />
                <hr />
                <AlumSecondaryInfo alum={alum} direction="column" />
                <hr />
                <AlumContactInfo alum={alum} />
              </Col>
              <Col xs={6}>
                <h1>{fullName(alum.firstName, alum.lastName)}</h1>
                <span>{`Class of ${alum.gradYear}`}</span>
              </Col>
            </Row>
          )
        )}
      </div>
      <ErrorModal error={error} />
    </PageContainer>
  );
}
