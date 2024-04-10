import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Item (Admin) table. See pages/ListItemAdmin.jsx. */
const UserItem = ({ item, collection }) => {
  const removeItem = (docID) => {
    collection.remove(docID);
  };
  return (
    <tr>
      <Image src={item.image} width={150} className="img-fluid" />
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
      <td>{item.condition}</td>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>
        <Link to={`/editItem/${item._id}`}>Edit</Link>
      </td>
      <td>
        <td><Button variant="danger" onClick={() => removeItem(item._id)}><Trash /></Button></td>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
UserItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    condition: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default UserItem;
