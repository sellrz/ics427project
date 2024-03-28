import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';

const Profile = ({ profile }) => (
  <Card className="h-100 mx-auto" style={{ width: '350px', fontFamily: 'Trebuchet MS, sans-serif', border: '3px solid black' }}>
    <Card.Header>
      <div className="d-flex justify-content-center">
        <Image src={profile.image} width={300} />
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Title className="mb-3" style={{ fontSize: '30px', fontWeight: 'bold' }}>{profile.firstName} {profile.lastName}</Card.Title>
      <Card.Subtitle className="mb-3" style={{ fontSize: '15px', fontWeight: 'bold' }}>Email: {profile.email}</Card.Subtitle>
      <Card.Subtitle className="mb-3" style={{ fontSize: '15px', fontWeight: 'bold' }}>Phone: {profile.phone}</Card.Subtitle>
      <Card.Subtitle className="mb-3" style={{ fontSize: '15px', fontWeight: 'bold' }}>About: {profile.description}</Card.Subtitle>
      <Link to={`/editProfile/${profile._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

Profile.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
