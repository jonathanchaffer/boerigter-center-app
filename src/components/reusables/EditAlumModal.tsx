import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { CuratedAlum } from "models";
import { updateAlumStory } from "services";

interface EditAlumModalProps {
  show: boolean;
  onCancel: () => void;
  title: string;
  message: string;
  currentAlum: CuratedAlum;
}
  
export function EditAlumModal({
    show,
    onCancel,
    message,
    currentAlum,
}: EditAlumModalProps): JSX.Element {
  
  const newAlum: CuratedAlum = {
    id: currentAlum.id,
    firstName: currentAlum.firstName,
    lastName: currentAlum.lastName,
    location: currentAlum.location,
    majors: currentAlum.majors,
    minors: currentAlum.minors,
    company: currentAlum.company,
    profilePhoto: currentAlum.profilePhoto,
    bio: currentAlum.bio,
    quotes: currentAlum.quotes,
    gradYear: currentAlum.gradYear,
    media: currentAlum.media,
    website: currentAlum.website,
    linkedIn: currentAlum.linkedIn,
    email: currentAlum.email,
    phone: currentAlum.phone,
    display: currentAlum.display,
  };

  return (
    <Modal show={show} onCancel={onCancel} centered>
        <Modal.Body>
        <h1>{message}</h1>
        <Form>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" onChange={ e => newAlum.firstName = e.target.value} defaultValue={newAlum.firstName}/>
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" onChange={ e => newAlum.lastName = e.target.value} defaultValue={newAlum.lastName}/>
            </Form.Group>
            <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter location" onChange={ e => newAlum.location = e.target.value} defaultValue={newAlum.location}/>
            </Form.Group>
            <Form.Group controlId="majors">
                <Form.Label>Majors</Form.Label>
                <Form.Control type="text" placeholder="Enter majors" onChange={ e => newAlum.majors = e.target.value.split(",")} defaultValue={newAlum.majors}/>
            </Form.Group>
            <Form.Group controlId="minors">
                <Form.Label>Minors</Form.Label>
                <Form.Control type="text" placeholder="Enter minors" onChange={ e => newAlum.minors = e.target.value.split(",")} defaultValue={newAlum.minors}/>
            </Form.Group>
            <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Enter company" onChange={ e => newAlum.company = e.target.value} defaultValue={newAlum.company}/>
            </Form.Group>
            <Form.Group controlId="profilePhoto">
                <Form.Label>Profile Photo</Form.Label>
                <Form.Control type="text" placeholder="Enter the link of profile photo" onChange={ e => newAlum.profilePhoto = e.target.value} defaultValue={newAlum.profilePhoto}/>
            </Form.Group>
            <Form.Group controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" placeholder="Enter bio" onChange={ e => newAlum.bio = e.target.value} defaultValue={newAlum.bio}/>
            </Form.Group>
            <Form.Group controlId="quotes">
                <Form.Label>Quotes</Form.Label>
                <Form.Control type="text" placeholder="Enter quotes" onChange={ e => newAlum.quotes = e.target.value.split(".")} defaultValue={newAlum.quotes}/>
            </Form.Group>
            <Form.Group controlId="gradYear">
                <Form.Label>Graduated Year</Form.Label>
                <Form.Control type="number" placeholder="Enter graduated year" onChange={ e => newAlum.gradYear = parseInt(e.target.value)} defaultValue={newAlum.gradYear}/>
            </Form.Group>
            <Form.Group controlId="media">
                <Form.Label>Media</Form.Label>
                <Form.Control type="text" placeholder="Enter media" onChange={ e => newAlum.media = e.target.value.split(",")} defaultValue={newAlum.media}/>
            </Form.Group>
            <Form.Group controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control type="text" placeholder="Enter website" onChange={ e => newAlum.website = e.target.value} defaultValue={newAlum.website}/>
            </Form.Group>
            <Form.Group controlId="linkedIn">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control type="text" placeholder="Enter LinkedIn" onChange={ e => newAlum.linkedIn = e.target.value} defaultValue={newAlum.linkedIn}/>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={ e => newAlum.email = e.target.value} defaultValue={newAlum.email}/>
            </Form.Group>
            <Form.Group controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" onChange={ e => newAlum.phone = e.target.value} defaultValue={newAlum.phone}/>
            </Form.Group>
        </Form>
        <Button variant="outline-secondary" onClick={onCancel}>
            Cancel
        </Button>
        <Button variant="outline-primary" onClick={() => {updateAlumStory(newAlum.id, newAlum); onCancel();}}>
            Submit    
        </Button>  
        </Modal.Body>
    </Modal>
  );
}