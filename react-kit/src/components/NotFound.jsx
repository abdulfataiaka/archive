import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    Page not found
    <br />
    <Link to="/">Homepage</Link>
  </div>
);

export default NotFound;
