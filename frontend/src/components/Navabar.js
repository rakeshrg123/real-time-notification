import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Add Friend Icon
import { useDispatch } from 'react-redux';
import { removeUser } from '../store/authSlice'; // Assuming Redux for auth management
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')) || null; // Retrieve user data
  const isAdmin = user?.user?.role === 'admin'; // Check if the user is admin
  const userName = user?.user?.name;

  // Open the menu when the profile icon is clicked
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle user logout
  const handleLogout = () => {
    dispatch(removeUser()); // Remove user from Redux state
    localStorage.removeItem('user'); // Clear user data from localStorage
    handleMenuClose();
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>

        <Box>
          {/* Add Friend Icon with Badge */}
          {user && (          
          <Link to="/friend">
            <IconButton color="inherit">
              <Badge color="secondary" variant="dot">
                <PersonAddIcon />
              </Badge>
            </IconButton>
          </Link>
           )}

          {/* Conditional Links for Admin */}
          {isAdmin && (
            <Link to="/register" style={{ textDecoration: 'none', color: 'white', marginLeft: '15px' }}>
              <Typography variant="button"> Add User</Typography>
            </Link>
       
          )}

          {/* Conditional Login Link */}
          {!user && (
            <Link to="/login" style={{ textDecoration: 'none', color: 'white', marginLeft: '15px' }}>
              <Typography variant="button">Login</Typography>
            </Link>
          )}

          {/* Profile Icon */}
          {user && (
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
            </IconButton>
          )}

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
              <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
