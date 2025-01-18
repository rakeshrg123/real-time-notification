import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { getProfile } from '../services/api';
import '../Profile.css';
import Navbar from './Navabar';
import { checkAuth } from './auth/CheckAuth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  console.log(user);

  useEffect(() => {
    if (!token) {
      console.error('No token found!');
      setIsLoading(false);
      return;
    }

    
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();

        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data)); // Save user data
      } catch (err) {
        console.error('Error fetching profile', err);
      } finally {
        setIsLoading(false);
      }
    };

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoading(false);
    } else {
      fetchProfile();
    }
  }, [token]);

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <>
      <Navbar />
      <Container className="container" style={{ marginTop: '8rem' }}>
        <Typography className="title">Profile</Typography>
        <Typography className="info">
          Name: <span className="highlight">{user.user.name}</span>
        </Typography>
        <Typography className="info">Email: {user.user.email}</Typography>
        <Typography className="info">Role: {user.user.role}</Typography>
      </Container>
    </>
  );
};

export default checkAuth(Profile);
