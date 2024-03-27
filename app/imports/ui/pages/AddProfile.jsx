import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useNavigate } from 'react-router-dom'; // Redirect the user to the homepage after successful form submission
import { Profiles } from '../../api/profile/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  studentId: Number,
  email: String,
  phone: Number,
  position: String,
  image: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddProfile = () => {
  const redirect = useNavigate();

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, studentId, email, phone, position, image, description } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert(
      { firstName, lastName, studentId, email, phone, position, image, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile added successfully', 'success');
          formRef.reset();
          redirect('/home');
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="firstName" /></Col>
                  <Col><TextField name="lastName" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="studentId" /></Col>
                  <Col><TextField name="email" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="phone" /></Col>
                  <Col><TextField name="position" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <LongTextField name="description" />
                <SubmitField />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProfile;
