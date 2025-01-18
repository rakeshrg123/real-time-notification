import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const checkAuth = (Component) => {
  const Wrapper = (props) => {
    const user = useSelector((store) => store.auth.user); // Get the user from the Redux store
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate('/login'); // Redirect to login if no user is found
      }
    }, [user, navigate]);

    // Render the wrapped component only if the user is authenticated
    return user ? <Component {...props} /> : null;
  };

  return Wrapper;
};
