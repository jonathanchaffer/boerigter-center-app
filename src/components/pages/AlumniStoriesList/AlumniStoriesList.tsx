import genericAvatar from "assets/images/generic_avatar.jpg";
import { PageContainer } from "components";
import { AlumSecondaryInfo, ErrorModal } from "components/reusables";
import { CuratedAlum } from "models";
import React from "react";
import { useAsync } from "react-async";
import { Button, Card, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Img from "react-cool-img";
import { useHistory } from "react-router-dom";
import { getAlumniStories } from "services";
import "./AlumniStoriesList.scss";

export function AlumniStoriesList(): JSX.Element {
  const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });
  return (
    <PageContainer>
      <div className="alumni-stories-list">
        <h1>Alumni Stories</h1>
        <p>Alumni hand-picked by Boerigter Center staff.</p>
        {isPending ? (
          <Spinner animation="border" />
        ) : (
          data && data.map(alum => <AlumCard key={alum.id} alum={alum} />)
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
  const history = useHistory();
  return (
    <Card onClick={() => history.push(`/stories/${alum.id}`)}>
      <Card.Body>
        <Row>
          <Col xs={3} md={2} className="d-flex align-items-center">
            <div className="img-square-container">
              <Img
                src={alum.profilePhoto || ""}
                placeholder={genericAvatar}
                alt={`${alum.firstName} ${alum.lastName}`}
                width="100%"
                loading="lazy"
              />
            </div>
          </Col>
          <Col className="d-flex align-items-center">
            <div>
              <h2>
                {`${alum.firstName} ${alum.lastName}`}{" "}
                <span className="light">&apos;{alum.gradYear % 100}</span>
              </h2>
              <AlumSecondaryInfo alum={alum} />
            </div>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <div className="d-flex flex-column justify-content-center">
              <a href={`/stories/${alum.id}`} className="p-3">
                Learn More
                <i className="ml-2 fas fa-arrow-right" />
              </a>
              <div className="buttons">
                <Button variant="outline-secondary" size="sm">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
