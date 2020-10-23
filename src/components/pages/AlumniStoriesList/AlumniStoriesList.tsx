import genericAvatar from "assets/images/generic_avatar.jpg";
import { PageContainer } from "components";
import { ErrorModal } from "components/reusables";
import { CuratedAlum } from "models";
import React from "react";
import { useAsync } from "react-async";
import { Card, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Img from "react-cool-img";
import { getAlumniStories } from "services";
import { commaSeparatedList } from "utilities";
import "./AlumniStoriesList.scss";

export function AlumniStoriesList(): JSX.Element {
  const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });
  return (
    <PageContainer>
      <div className="alumni-stories-list">
        <h1>Alumni Stories</h1>
        {isPending ? (
          <Spinner animation="border" />
        ) : (
          data && data.map(alum => <AlumCard key={alum.uid} alum={alum} />)
        )}
      </div>
      <ErrorModal error={error} />
    </PageContainer>
  );
}

interface AlumCardProps {
  alum: CuratedAlum;
}

function AlumCard({ alum }: AlumCardProps): JSX.Element {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={3} md={2} className="d-flex align-items-center">
            <Img
              src={alum.profilePhoto || ""}
              placeholder={genericAvatar}
              alt={`${alum.firstName} ${alum.lastName}`}
              width="100%"
              loading="lazy"
              className="img-circle"
            />
          </Col>
          <Col className="d-flex align-items-center">
            <div>
              <h2>
                {`${alum.firstName} ${alum.lastName}`}{" "}
                <span className="light">&apos;{alum.gradYear % 1000}</span>
              </h2>
              <div className="secondary-info">
                {alum.location && (
                  <span>
                    <i className="fas fa-location-arrow" />
                    {alum.location}
                  </span>
                )}
                {alum.majors && (
                  <span>
                    <i className="fas fa-graduation-cap" />
                    {commaSeparatedList(alum.majors)}
                  </span>
                )}
                {alum.company && (
                  <span>
                    <i className="fas fa-briefcase" />
                    {alum.company}
                  </span>
                )}
              </div>
            </div>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <a href={`/stories/${alum.uid}`} className="p-3">
              Learn More
              <i className="ml-2 fas fa-arrow-right" />
            </a>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
