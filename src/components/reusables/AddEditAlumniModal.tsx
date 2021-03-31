import genericAvatar from "assets/images/generic_avatar.jpg";
import { PhotoUploader } from "components";
import { CuratedAlum } from "models";
import React, { FormEvent, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import Img from "react-cool-img";
import { addAlumStory, updateAlumStory, uploadProfilePhoto } from "services";
import { fullName } from "utilities";

interface AddEditAlumniModalProps {
  show: boolean;
  onCancel: () => void;
  currentAlum: CuratedAlum | undefined;
}

export function AddEditAlumniModal({
  show,
  onCancel,
  currentAlum,
}: AddEditAlumniModalProps): JSX.Element {
  const emptyAlum: CuratedAlum = {
    bio: "",
    company: "",
    display: true,
    email: "",
    firstName: "",
    gradYear: 0,
    id: "",
    lastName: "",
    linkedIn: "",
    location: "",
    majors: [],
    minors: [],
    phone: "",
    profilePhoto: "",
    quotes: [],
    website: "",
  };

  const [editedAlum, setEditedAlum] = useState<CuratedAlum>(
    currentAlum ? { ...currentAlum } : emptyAlum,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | undefined>(undefined);
  const [isReplacingPhoto, setIsReplacingPhoto] = useState(false);
  const isNew = currentAlum === undefined;

  // TODO: add error handling
  async function submitAlum(event: FormEvent) {
    event.preventDefault(); // prevents the page from reloading immediately on submit
    setIsSubmitting(true);

    if (uploadedPhoto !== undefined) {
      const snapshot = await uploadProfilePhoto(uploadedPhoto, editedAlum);
      const url = await snapshot.ref.getDownloadURL();
      editedAlum.profilePhoto = url;
    }

    const submitFn = isNew
      ? () => addAlumStory(editedAlum)
      : () => updateAlumStory(editedAlum.id, editedAlum);

    submitFn().finally(() => {
      setIsSubmitting(false);
      window.location.reload();
    });
  }

  return (
    <Modal show={show} size="lg" onCancel={onCancel} className="add-edit-alumni-modal">
      <Form onSubmit={submitAlum}>
        <Modal.Header>
          <Modal.Title>
            {isNew ? "Add New Alum" : `Edit ${fullName(editedAlum.firstName, editedAlum.lastName)}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <strong>Basic Info</strong>
          </Form.Group>
          <Form.Row>
            <Col>
              <AlumniFormGroup
                attribute="firstName"
                label="First Name"
                placeholder="e.g. Jane"
                onChange={e => setEditedAlum({ ...editedAlum, firstName: e.target.value.trim() })}
                defaultValue={editedAlum.firstName}
                required
              />
            </Col>
            <Col>
              <AlumniFormGroup
                attribute="lastName"
                label="Last Name"
                placeholder="e.g. Doe"
                onChange={e => setEditedAlum({ ...editedAlum, lastName: e.target.value.trim() })}
                defaultValue={editedAlum.lastName}
                required
              />
            </Col>
            <Col>
              <AlumniFormGroup
                type="number"
                attribute="gradYear"
                label="Graduation Year"
                placeholder={`e.g. ${new Date().getFullYear()}`}
                onChange={e =>
                  setEditedAlum({ ...editedAlum, gradYear: parseInt(e.target.value, 10) })
                }
                defaultValue={editedAlum.gradYear ? editedAlum.gradYear.toString() : ""}
                required
              />
            </Col>
          </Form.Row>
          <Form.Group>
            <Form.Label>Profile Photo</Form.Label>
            {!!editedAlum.profilePhoto && !isReplacingPhoto ? (
              <Form.Row>
                <Col xs={2}>
                  <Img
                    src={editedAlum.profilePhoto || ""}
                    placeholder={genericAvatar}
                    alt={`${editedAlum.firstName} ${editedAlum.lastName}`}
                    width="100%"
                    loading="lazy"
                    className="img-circle"
                  />
                </Col>
                <Col className="d-flex align-items-center">
                  <Button variant="outline-secondary" onClick={() => setIsReplacingPhoto(true)}>
                    Replace
                  </Button>
                </Col>
              </Form.Row>
            ) : (
              <PhotoUploader onDrop={(photos: File[]) => setUploadedPhoto(photos[0])} />
            )}
          </Form.Group>
          <Form.Row>
            <Col>
              <AlumniFormGroup
                attribute="location"
                label="Location"
                placeholder="e.g. Holland, MI"
                onChange={e => setEditedAlum({ ...editedAlum, location: e.target.value.trim() })}
                defaultValue={editedAlum.location}
                required
              />
            </Col>
            <Col>
              <AlumniFormGroup
                attribute="company"
                label="Company"
                placeholder="e.g. SpinDance"
                onChange={e => setEditedAlum({ ...editedAlum, company: e.target.value.trim() })}
                defaultValue={editedAlum.company}
                required
              />
            </Col>
          </Form.Row>
          <AlumniFormGroup
            attribute="majors"
            label="Major(s)"
            placeholder="Enter majors separated by commas (major1, major2, ...)"
            onChange={e =>
              setEditedAlum({
                ...editedAlum,
                majors: e.target.value.split(",").map(major => major.trim()),
              })
            }
            defaultValue={editedAlum.majors.join(", ")}
            required
          />
          <AlumniFormGroup
            attribute="minors"
            label="Minors(s)"
            placeholder="Enter minors separated by commas (major1, major2, ...)"
            onChange={e =>
              setEditedAlum({
                ...editedAlum,
                minors: e.target.value.split(",").map(minor => minor.trim()),
              })
            }
            defaultValue={editedAlum.minors?.join(", ") || ""}
          />
          <AlumniFormGroup
            as="textarea"
            rows={6}
            attribute="bio"
            label="Bio"
            placeholder="Enter some interesting information about this alum"
            onChange={e => setEditedAlum({ ...editedAlum, bio: e.target.value.trim() })}
            defaultValue={editedAlum.bio}
            required
          />
          <Form.Group>
            <strong>Other Info</strong>
          </Form.Group>
          <AlumniFormGroup
            as="textarea"
            rows={3}
            attribute="quotes"
            label="Quotes"
            placeholder="Enter any quotes separated by pipes (quote1 | quote2 | ...)"
            onChange={e =>
              setEditedAlum({
                ...editedAlum,
                quotes: e.target.value.split("|").map(quote => quote.trim()),
              })
            }
            defaultValue={editedAlum.quotes?.join(" | ") || ""}
          />
          <AlumniFormGroup
            attribute="website"
            label="Website"
            placeholder="e.g. https://example.com"
            onChange={e => setEditedAlum({ ...editedAlum, website: e.target.value.trim() })}
            defaultValue={editedAlum.website || ""}
          />
          <AlumniFormGroup
            attribute="linkedIn"
            label="LinkedIn"
            placeholder="e.g. https://linkedin.com/in/jane-doe"
            onChange={e => setEditedAlum({ ...editedAlum, linkedIn: e.target.value.trim() })}
            defaultValue={editedAlum.linkedIn || ""}
          />
          <AlumniFormGroup
            attribute="email"
            label="Email"
            placeholder="e.g. example@example.com"
            onChange={e => setEditedAlum({ ...editedAlum, email: e.target.value.trim() })}
            defaultValue={editedAlum.email || ""}
          />
          <AlumniFormGroup
            attribute="phone"
            label="Phone"
            placeholder="e.g. 555-555-5555"
            onChange={e => setEditedAlum({ ...editedAlum, phone: e.target.value.trim() })}
            defaultValue={editedAlum.phone || ""}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="outline-primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

interface AlumniFormGroupProps {
  attribute: keyof CuratedAlum;
  type?: "text" | "number";
  as?: "textarea";
  label: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  defaultValue: string;
  required?: boolean;
  rows?: number;
}

function AlumniFormGroup({
  attribute,
  label,
  placeholder,
  onChange,
  defaultValue,
  type,
  as,
  required,
  rows,
}: AlumniFormGroupProps) {
  return (
    <Form.Group controlId={attribute}>
      <Form.Label>
        {label}
        {required && <span className="text-danger"> *</span>}
      </Form.Label>
      <Form.Control
        placeholder={placeholder}
        onChange={onChange}
        type={type || "text"}
        defaultValue={defaultValue}
        as={as}
        required={required}
        rows={rows}
      />
    </Form.Group>
  );
}
