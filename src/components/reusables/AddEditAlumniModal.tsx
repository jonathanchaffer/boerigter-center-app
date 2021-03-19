import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { CuratedAlum } from "models";
import { addAlumStory, updateAlumStory } from "services";

interface AddEditAlumniModalProps {
  show: boolean;
  onCancel: () => void;
  title: string;
  message: string;
  currentAlum: CuratedAlum;
  isAdd: boolean;
}
  
export function AddEditAlumniModal({
    show,
    onCancel,
    message,
    currentAlum,
    isAdd,
}: AddEditAlumniModalProps): JSX.Element {
  
  const alum: CuratedAlum = {
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

  function submitAlum(){
      if({isAdd}) {
        addAlumStory(alum).finally(() => { onCancel(); window.location.reload() });
      } else {
        updateAlumStory(alum.id, alum).finally(() => { onCancel(); window.location.reload() });
      }

  }

  return (
    <Modal show={show} onCancel={onCancel} centered>
        <Modal.Body>
        <h1>{message}</h1>
        <Form>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" onChange={ e => alum.firstName = e.target.value} defaultValue={alum.firstName}/>
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" onChange={ e => alum.lastName = e.target.value} defaultValue={alum.lastName}/>
            </Form.Group>
            <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter location" onChange={ e => alum.location = e.target.value} defaultValue={alum.location}/>
            </Form.Group>
            <Form.Group controlId="majors">
                <Form.Label>Majors</Form.Label>
                <Form.Control type="text" placeholder="Enter majors (major1,major2,major3,...)" onChange={ e => alum.majors = e.target.value.split(",")} defaultValue={alum.majors}/>
            </Form.Group>
            <Form.Group controlId="minors">
                <Form.Label>Minors</Form.Label>
                <Form.Control type="text" placeholder="Enter minors (minor1,minor2,minor3,...)" onChange={ e => alum.minors = e.target.value.split(",")} defaultValue={alum.minors}/>
            </Form.Group>
            <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Enter company" onChange={ e => alum.company = e.target.value} defaultValue={alum.company}/>
            </Form.Group>
            <Form.Group controlId="profilePhoto">
                <Form.Label>Profile Photo</Form.Label>
                <Form.Control type="text" placeholder="Enter the link of profile photo" onChange={ e => alum.profilePhoto = e.target.value} defaultValue={alum.profilePhoto}/>
            </Form.Group>
            <Form.Group controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" placeholder="Enter bio" onChange={ e => alum.bio = e.target.value} defaultValue={alum.bio}/>
            </Form.Group>
            <Form.Group controlId="quotes">
                <Form.Label>Quotes</Form.Label>
                <Form.Control type="text" placeholder="Enter quotes (quote1|quote2|quote3|...)" onChange={ e => alum.quotes = e.target.value.split("|")} defaultValue={alum.quotes}/>
            </Form.Group>
            <Form.Group controlId="gradYear">
                <Form.Label>Graduated Year</Form.Label>
                <Form.Control type="number" placeholder="Enter graduated year" onChange={ e => alum.gradYear = parseInt(e.target.value)} defaultValue={alum.gradYear}/>
            </Form.Group>
            <Form.Group controlId="media">
                <Form.Label>Media</Form.Label>
                <Form.Control type="text" placeholder="Enter media" onChange={ e => alum.media = e.target.value.split(",")} defaultValue={alum.media}/>
            </Form.Group>
            <Form.Group controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control type="text" placeholder="Enter website" onChange={ e => alum.website = e.target.value} defaultValue={alum.website}/>
            </Form.Group>
            <Form.Group controlId="linkedIn">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control type="text" placeholder="Enter LinkedIn" onChange={ e => alum.linkedIn = e.target.value} defaultValue={alum.linkedIn}/>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={ e => alum.email = e.target.value} defaultValue={alum.email}/>
            </Form.Group>
            <Form.Group controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" onChange={ e => alum.phone = e.target.value} defaultValue={alum.phone}/>
            </Form.Group>
        </Form>
        <Button variant="outline-secondary" onClick={onCancel}>
            Cancel
        </Button>
        <Button variant="outline-primary" onClick={()=>submitAlum()}>
            Submit    
        </Button>  
        </Modal.Body>
    </Modal>
  );
}