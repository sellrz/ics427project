import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Items } from '../../api/item/Item';
import ItemAdmin from '../components/ItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all Item documents. Use <ItemItemAdmin> to render each row. */
const ListItemAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { items, ready } = useTracker(() => {
    // Get access to Item documents.
    const subscription = Meteor.subscribe(Items.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Item documents
    const itemsitems = Items.collection.find({}).fetch();
    return {
      items: itemsitems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>List Item (Admin)</h2></Col>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Condition</th>
                <th>Category</th>
                <th>Description</th>
                <th>Owner</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => <ItemAdmin key={item._id} item={item} collection={Items.collection} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListItemAdmin;
