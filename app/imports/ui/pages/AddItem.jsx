import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Items } from '../../api/item/Item';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  price: Number,
  image: String,
  condition: {
    type: String,
    allowedValues: ['Excellent', 'Good', 'Fair', 'Poor'],
    defaultValue: 'Good',
  },
  category: {
    type: String,
    allowedValues: ['Books', 'Clothing', 'Electronics', 'Household', 'Others'],
    defaultValue: 'Others',
  },
  description: {
    type: String,
    defaultValue: 'Describe your item',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddItem page for adding a document. */
const AddItem = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, quantity, price, condition, category, image, description } = data;
    const owner = Meteor.user().username;
    Items.collection.insert(
      { name, quantity, price, condition, category, image, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3" id="add-item-nav">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Item</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <NumField name="quantity" decimal={null} />
                <NumField name="price" decimal={null} />
                <SelectField name="condition" />
                <SelectField name="category" />
                <TextField name="image" />
                <LongTextField name="description" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddItem;
