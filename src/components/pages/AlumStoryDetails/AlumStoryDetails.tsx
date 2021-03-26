import genericAvatar from "assets/images/generic_avatar.jpg";
import { ErrorModal, PageContainer } from "components";
import { AlumContactInfo, AlumSecondaryInfo } from "components/reusables";
import React, { useCallback } from "react";
import { useAsync } from "react-async";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import Img from "react-cool-img";
import { useParams } from "react-router-dom";
import { getAlumStory } from "services";
import { fullName } from "utilities";

interface AlumStoryDetailsProps {
  pos: "top" | "bottom";
}

export function AlumStoryDetails({ pos }: AlumStoryDetailsProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const promiseFn = useCallback(() => getAlumStory(id), [id]);
  const { data, error, isPending } = useAsync({ promiseFn });
  const alum = data;

  return (
    <PageContainer pos={pos}>
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
                    <h1>{fullName(alum.firstName, alum.lastName)}</h1>
                    <span>{`Class of ${alum.gradYear}`}</span>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col xs={8}>
                    <h4>About</h4>
                    <p>{alum.bio}</p>
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
