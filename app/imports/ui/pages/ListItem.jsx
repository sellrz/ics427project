import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Items } from '../../api/item/Item';
import Item from '../components/Item';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table with all items.  <ItemItem> renders each row. */
const ListItem = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, items } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Item documents.
    const subscription = Meteor.subscribe(Items.usersPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Item documents
    const item = Items.collection.find({}).fetch();
    return {
      items: item,
      ready: rdy,
    };
  }, []);
  console.log('listItem', items, ready);
  return (ready ? (
    <Container className="py-3" id="listitem-page">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Everything for sale</h2>
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
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => <Item key={item._id} item={item} collection={Items.collection} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListItem;
