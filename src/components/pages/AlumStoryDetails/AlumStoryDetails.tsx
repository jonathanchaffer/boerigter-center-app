import genericAvatar from "assets/images/generic_avatar.jpg";
import { ErrorModal, PageContainer } from "components";
import { AlumContactInfo, AlumSecondaryInfo } from "components/reusables";
import { AddEditAlumniModal } from "components/reusables/AddEditAlumniModal";
import { UserContext } from "contexts";
import React, { useCallback, useContext, useState } from "react";
import { useAsync } from "react-async";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import Img from "react-cool-img";
import { Redirect, useParams } from "react-router-dom";
import { getAlumStory } from "services";
import { generateFullName, URLPaths } from "utilities";

export function AlumStoryDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const user = useContext(UserContext);
  const [isShowingEditAlumModal, setIsShowingEditAlumModal] = useState(false);
  const promiseFn = useCallback(() => getAlumStory(id), [id]);
  const { data, error, isPending } = useAsync({ promiseFn });
  const alum = data;

  if (!alum && !isPending) return <Redirect to={URLPaths.alumStories} />;

  return (
    <>
      <PageContainer>
        <div>
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
                <Col>
                  <Row>
                    <Col>
                      <h1>{generateFullName(alum.firstName, alum.lastName)}</h1>
                      <span>{`Class of ${alum.gradYear}`}</span>
                    </Col>
                    {!!user && (
                      <Col xs="auto">
                        <Button
                          variant="outline-secondary"
                          onClick={() => setIsShowingEditAlumModal(true)}
                        >
                          Edit
                        </Button>
                      </Col>
                    )}
                  </Row>
                  <hr />
                  <Row>
                    <Col xs={8}>
                      <h4>About</h4>
                      <p className="p-breaks">{alum.bio}</p>
                    </Col>
                    <Col xs={4}>
                      {(alum.quotes || []).length > 0 && (
                        <>
                          <h4>Quotes</h4>
                          <Card className="quotes">
                            <Card.Body>
                              {alum.quotes?.map(quote => (
                                <AlumQuote key={quote} quote={quote} />
                              ))}
                            </Card.Body>
                          </Card>
                        </>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          )}
          <ErrorModal error={error} />
        </div>
      </PageContainer>
      {!!alum && (
        <AddEditAlumniModal
          show={isShowingEditAlumModal}
          onCancel={() => setIsShowingEditAlumModal(false)}
          currentAlum={alum}
        />
      )}
    </>
  );
}

interface AlumQuoteProps {
  quote: string;
}

function AlumQuote({ quote }: AlumQuoteProps): JSX.Element {
  return (
    <div className="quote d-flex flex-row">
      <h1>&quot;</h1>
      <span>{quote}&quot;</span>
    </div>
  );
}
