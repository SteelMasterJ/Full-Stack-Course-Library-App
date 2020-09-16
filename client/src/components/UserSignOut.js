import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
  // Call signout function.
  useEffect(() => context.actions.signOut());

  return (
    <Redirect to="/" />
  );
}