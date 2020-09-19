
import React from 'react';
import { Link } from 'react-router-dom'

export default () => (
  <div className="bounds white-text">
    <h1>Forbidden</h1>
    <p>Sorry! You do not have access to this page.</p>
    <Link className="button button-secondary" to="/">Return to List</Link>
  </div>
);