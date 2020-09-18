import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="bounds white-text">
    <h1>Not Found</h1>
    <p>Much like the U2 song, you still havent found what you're looking for</p>
    <Link className="button button-secondary" to="/">Return to List</Link>
  </div>
);