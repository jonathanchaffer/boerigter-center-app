import genericAvatar from "assets/images/generic_avatar.jpg";
import { AlumSecondaryInfo, ConfirmationModal, ErrorModal, PageContainer } from "components";
// import { NewAlumModal } from "components/reusables/NewAlumModal";
// import { EditAlumModal } from "components/reusables/EditAlumModal";
import { AddEditAlumniModal } from "components/reusables/AddEditAlumniModal";
import { UserContext } from "contexts";
import { CuratedAlum } from "models";
import React, { useContext, useState } from "react";
import { useAsync } from "react-async";
import { Button, Card, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Img from "react-cool-img";
import { deleteAlumStory, getAlumniStories, updateAlumStory } from "services";
import { URLPaths } from "utilities";
import "./AlumniStoriesList.scss";

export function AlumniStoriesList(): JSX.Element {
  const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });
  const user = useContext(UserContext);
  const [isShowingNewAlumModal, setIsShowingNewAlumModal] = useState(false);

  return (
    <PageContainer>
      <div className="alumni-stories-list">
        <div className="d-flex justify-content-between">
          <div>
            <h1>Alumni Stories</h1>
            <p>Alumni hand-picked by Boerigter Center staff.</p>
          </div>
          <div>
            {!!user && (
              <Button
                variant="outline-primary"
                onClick={() => setIsShowingNewAlumModal(true)}
                size="lg"
              >
                <i className="fas fa-plus mr-2" />
                New Alum
              </Button>
            )}
          </div>
        </div>
        {isPending ? (
          <Spinner animation="border" />
        ) : (
          data &&
          data
            .filter(alum => !!user || alum.display === true)
            .map(alum => <AlumCard key={alum.id} alum={alum} />)
        )}
      </div>
      <ErrorModal error={error} />
      <AddEditAlumniModal
        show={isShowingNewAlumModal}
        onCancel={() => setIsShowingNewAlumModal(false)}
        currentAlum={undefined}
      />
    </PageContainer>
  );
}

interface AlumCardProps {
  alum: CuratedAlum;
}

function AlumCard({ alum }: AlumCardProps): JSX.Element {
  const [isShowingConfirmDelete, setIsShowingConfirmDelete] = useState(false);
  const user = useContext(UserContext);
  const [isShowingEditAlumModal, setIsShowingEditAlumModal] = useState(false);
  const [isDisplaying, setIsDisplaying] = useState(alum.display);

  return (
    <>
      <Row>
        {!!user && (
          <Col xs="auto" className="d-flex align-items-center p-0">
            <Button
              variant="outline-primary"
              className="hide-show-btn"
              onClick={() => {
                // TODO: add error handling to this async call
                updateAlumStory(alum.id, { ...alum, display: !isDisplaying }).then(() =>
                  setIsDisplaying(!isDisplaying),
                );
              }}
            >
              <i className={`fas ${isDisplaying ? "fa-eye" : "fa-eye-slash"}`} />
            </Button>
          </Col>
        )}
        <Col>
          <Card style={{ opacity: isDisplaying ? 1 : 0.5 }}>
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
                      <span className="light">
                        &apos;{(alum.gradYear % 100).toString().padStart(2, "0")}
                      </span>
                    </h2>
                    <AlumSecondaryInfo alum={alum} />
                  </div>
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                  <div className="d-flex flex-column justify-content-center">
                    <a href={`${URLPaths.alumStories}/${alum.id}`} className="p-3">
                      Learn More
                      <i className="ml-2 fas fa-arrow-right" />
                    </a>
                    {!!user && (
                      <div className="buttons spaced-children">
                        <div className="buttons spaced-children">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setIsShowingEditAlumModal(true)}
                          >
                            Edit
                          </Button>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => setIsShowingConfirmDelete(true)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmationModal
        title="Delete alum story?"
        message="Are you sure you want to delete this alum story? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        show={isShowingConfirmDelete}
        onConfirm={() => {
          return deleteAlumStory(alum.id).finally(() => {
            window.location.reload();
          });
        }}
        onHide={() => setIsShowingConfirmDelete(false)}
      />
      <AddEditAlumniModal
        show={isShowingEditAlumModal}
        onCancel={() => setIsShowingEditAlumModal(false)}
        currentAlum={alum}
      />
    </>
  );
}
