import React from 'react';
import './App.css';
import Navbar from './components/Navabar';
import { NavLink } from 'react-router-dom';

function App() {
  // Get user data from localStorage (assume user data is stored after login)
  const user = JSON.parse(localStorage.getItem('user')) || null;

  return (
    <>
    <Navbar></Navbar>
    <div className="App">
      <header className="App-header">
        {user ? (
          // Show a personalized welcome message if the user is logged in
          <p>
            Welcome, <strong>{user.user.name}</strong>! We're glad to have you here.
          </p>
        ) : (
          // Default message for users who are not logged in
          <>
          <p>Welcome to our application! Please log in to continue.</p>
    
          </>
        )}
      </header>
    </div></>
  );
}

export default App;
