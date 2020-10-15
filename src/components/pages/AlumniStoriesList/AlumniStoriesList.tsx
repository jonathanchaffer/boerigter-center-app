import { PageContainer } from "components";
import { ErrorModal } from "components/reusables";
import { CuratedAlum } from "models";
import React from "react";
import { useAsync } from "react-async";
import { Card, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getAlumniStories } from "services";
import "./AlumniStories.scss";

export function AlumniStoriesList(): JSX.Element {
  const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });
  return (
    <PageContainer>
      <h1>Alumni Stories</h1>
      {isPending ? (
        <Spinner animation="border" />
      ) : (
        data && data.map(alum => <AlumCard key={alum.uid} alum={alum} />)
      )}
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
      <Container>
        <Row className="d-inline-flex p-2 col-example">
          <Col xs={2} sm={4} md={4}>
            <Card.Img src="https://s3.amazonaws.com/campuskudos-images/generic_avatar.jpg" />
          </Col>
          <Col xs={6}>
            <Card.Body>
              <Card.Title>
                {alum.firstName} {alum.lastName}
              </Card.Title>
              <Card.Subtitle>{alum.majors} </Card.Subtitle>
            </Card.Body>
          </Col>
          <Col xs={2}>
            <Card.Link href={alum.website}>Learn more</Card.Link>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}
