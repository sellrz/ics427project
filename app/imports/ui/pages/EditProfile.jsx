import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Profiles } from '../../api/profile/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* Renders the EditProfile page for editing a single document. */
const EditProfile = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditProfile', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Profile documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Profiles.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditProfile', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, email, phone, image, description } = data;
    Profiles.collection.update(_id, { $set: { firstName, lastName, email, phone, image, description } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Your profile has updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="firstName" /></Col>
                  <Col><TextField name="lastName" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="email" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="phone" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <LongTextField name="description" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;
