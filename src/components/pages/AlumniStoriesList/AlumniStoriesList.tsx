import { PageContainer } from "components";
import { ErrorModal } from "components/reusables";
import { CuratedAlum } from "models";
import React from "react";
import { useAsync } from "react-async";
import { Card, Spinner } from "react-bootstrap";
import { getAlumniStories } from "services";

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
      <Card.Body>
        {alum.firstName} {alum.lastName}
      </Card.Body>
    </Card>
  );
}
