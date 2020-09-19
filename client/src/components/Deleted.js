import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="actions--bar">
      <div className="bounds">
        <div className="grid-100">
            <h1>Course has been deleted!</h1>
            <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    </div>
  );
}