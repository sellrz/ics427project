import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Items } from '../../api/item/Item';
import LoadingSpinner from '../components/LoadingSpinner';
import UserItem from '../components/UserItem';

/* Renders a table containing all of the Item documents. Use <UserItem> to render each row. */
const ListItemUser = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, items } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Item documents.
    const subscription = Meteor.subscribe(Items.userPublicationName);
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
    <Container className="py-3" id="listitemuser-page">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Your Item List</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Condition</th>
                <th>Category</th>
                <th>Description</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => <UserItem key={item._id} item={item} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListItemUser;
