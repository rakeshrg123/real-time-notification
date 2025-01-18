import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice'; // Adjust the path as needed
import { loginUser } from '../../services/api';
import Navbar from '../Navabar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser(formData); // Assuming the API returns user and token
      console.log(data);
      navigate('/')
      dispatch(setUser(data)); // Dispatch action to save user data and token in Redux
    } catch (err) {
      setError('Invalid credentials'); // Handle login errors
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xs" style={{ marginTop: '3rem' }}>
        <Box sx={{ textAlign: 'center', padding: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
            Login
          </Typography>
          {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
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
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
