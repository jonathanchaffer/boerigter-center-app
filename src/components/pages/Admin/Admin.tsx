import { PageContainer } from "components";
import { ErrorModal } from "components/reusables";
import { CuratedAlum } from "models";
import React, {useState} from "react";
import { useAsync } from "react-async";
import { Button, Card, Spinner } from "react-bootstrap";
import { getAlumniStories } from "services";


const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });

export function Admin(): JSX.Element {
  const [isLoggedIn, toggleSetLoggedIn] = useState(false);
  // const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });

  const handleClick = () => {
    toggleSetLoggedIn(true);
  }

  return (
    <PageContainer>
      <h1>Alumni Stories</h1>
      <h2>Admin View</h2>
      {isLoggedIn ? (
        RenderContent()
      ) : (
        <Button value="Login" onClick={handleClick} >Login</Button>
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
function RenderContent(): JSX.Element {
  // const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });
  return (
    <div>
      <Button>Log out</Button>
      {isPending ? (
        <Spinner animation="border" />
      ) : (
        data && data.map(alum => <AlumCard key={alum.uid} alum={alum} />)
      )}
    </div>
  )
}
