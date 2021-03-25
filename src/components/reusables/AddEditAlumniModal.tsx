import { CuratedAlum } from "models";
import React, { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { addAlumStory, updateAlumStory } from "services";

interface AddEditAlumniModalProps {
  show: boolean;
  onCancel: () => void;
  currentAlum: CuratedAlum;
  isNew: boolean;
}

export function AddEditAlumniModal({
  show,
  onCancel,
  currentAlum,
  isNew,
}: AddEditAlumniModalProps): JSX.Element {
  const [editedAlum, setEditedAlum] = useState<CuratedAlum>({ ...currentAlum });

  function submitAlum() {
    if (isNew) {
      addAlumStory(editedAlum).finally(() => {
        onCancel();
        window.location.reload();
      });
    } else {
      updateAlumStory(editedAlum.id, editedAlum).finally(() => {
        onCancel();
        window.location.reload();
      });
    }
  }

  return (
    <Modal show={show} size="lg" onCancel={onCancel} centered>
      <Modal.Header>
        <Modal.Title>{isNew ? "Add New Alum" : "Edit Alum"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  onChange={e => setEditedAlum({ ...editedAlum, firstName: e.target.value })}
                  defaultValue={editedAlum.firstName}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  onChange={e => setEditedAlum({ ...editedAlum, lastName: e.target.value })}
                  defaultValue={editedAlum.lastName}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              onChange={e => setEditedAlum({ ...editedAlum, location: e.target.value })}
              defaultValue={editedAlum.location}
            />
          </Form.Group>
          <Form.Group controlId="majors">
            <Form.Label>Majors</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter majors (major1,major2,major3,...)"
              onChange={e => setEditedAlum({ ...editedAlum, majors: e.target.value.split(",") })}
              defaultValue={editedAlum.majors}
            />
          </Form.Group>
          <Form.Group controlId="minors">
            <Form.Label>Minors</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter minors (minor1,minor2,minor3,...)"
              onChange={e => setEditedAlum({ ...editedAlum, minors: e.target.value.split(",") })}
              defaultValue={editedAlum.minors}
            />
          </Form.Group>
          <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company"
              onChange={e => setEditedAlum({ ...editedAlum, company: e.target.value })}
              defaultValue={editedAlum.company}
            />
          </Form.Group>
          <Form.Group controlId="profilePhoto">
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the link of profile photo"
              onChange={e => setEditedAlum({ ...editedAlum, profilePhoto: e.target.value })}
              defaultValue={editedAlum.profilePhoto}
            />
          </Form.Group>
          <Form.Group controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bio"
              onChange={e => setEditedAlum({ ...editedAlum, bio: e.target.value })}
              defaultValue={editedAlum.bio}
            />
          </Form.Group>
          <Form.Group controlId="quotes">
            <Form.Label>Quotes</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quotes (quote1|quote2|quote3|...)"
              onChange={e => setEditedAlum({ ...editedAlum, quotes: e.target.value.split("|") })}
              defaultValue={editedAlum.quotes}
            />
          </Form.Group>
          <Form.Group controlId="gradYear">
            <Form.Label>Graduated Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter graduated year"
              onChange={e =>
                setEditedAlum({ ...editedAlum, gradYear: parseInt(e.target.value, 10) })
              }
              defaultValue={editedAlum.gradYear}
            />
          </Form.Group>
          <Form.Group controlId="website">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter website"
              onChange={e => setEditedAlum({ ...editedAlum, website: e.target.value })}
              defaultValue={editedAlum.website}
            />
          </Form.Group>
          <Form.Group controlId="linkedIn">
            <Form.Label>LinkedIn</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter LinkedIn"
              onChange={e => setEditedAlum({ ...editedAlum, linkedIn: e.target.value })}
              defaultValue={editedAlum.linkedIn}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={e => setEditedAlum({ ...editedAlum, email: e.target.value })}
              defaultValue={editedAlum.email}
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              onChange={e => setEditedAlum({ ...editedAlum, phone: e.target.value })}
              defaultValue={editedAlum.phone}
            />
          </Form.Group>
        </Form>
        <Button variant="outline-secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="outline-primary" onClick={() => submitAlum()}>
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
}
