import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

/** Renders a single row in the List Item table. See pages/ListItem.jsx. */
const Item = ({ item }) => (
  <tr>
    <Image src={item.image} width={150} className="img-fluid" />
    <td>{item.name}</td>
    <td>{item.quantity}</td>
    <td>{item.price}</td>
    <td>{item.condition}</td>
    <td>{item.category}</td>
    <td>{item.description}</td>
    <td>{item.owner}</td>
  </tr>
);

// Require a document to be passed to this component.
Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    condition: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
};

export default Item;
