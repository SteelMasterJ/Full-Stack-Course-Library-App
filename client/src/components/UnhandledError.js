import React from 'react';
import { Link } from 'react-router-dom'

export default () => (
  <div className="bounds white-text">
    <h1>Error</h1>
    <p>Oops! An unexpected error has occured.</p>
    <Link className="button button-secondary" to="/">Return to List</Link>
  </div>
);