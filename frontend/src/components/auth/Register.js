import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { registerUser } from '../../services/api';
import Navbar from '../Navabar';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await registerUser(formData);
      alert('Registration successful');
      navigate('/login')

    } catch (err) {
      setError('Error during registration');
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <Container maxWidth="xs" style={{marginTop:'3rem'}}>
      <Box sx={{ textAlign: 'center', padding: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
          Add User
        </Typography>
        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f5f5',
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f5f5',
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f5f5',
              },
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f5f5',
              },
            }}
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary" 
            sx={{
              marginTop: 2,
              borderRadius: '8px',
              textTransform: 'none',
              backgroundColor: '#3f51b5',
              '&:hover': {
                backgroundColor: '#2c387e',
              },
            }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
    </>
  );
};

export default Register;
