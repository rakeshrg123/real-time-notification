var express = require('express');
var router = express.Router();
const User = require('../models/userModel');
const verifyToken = require('./verifyToken');




router.get('/profile', verifyToken(), (req, res) => {
  const userId = req.user.userId;  // Get user ID from the token

  // Fetch user details from the database
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return only the required fields
      const { _id ,name, email, role } = user;
      res.status(200).json({ _id,name, email, role });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    });
});


router.get('/getUser/:id', verifyToken(), (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ data: user });
    })
    .catch(error => {  
      res.status(500).json({ error: 'Failed to get user' });
    });
});





module.exports = router;
