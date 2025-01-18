var express = require('express');
var router = express.Router();
const User = require('../models/userModel');
var verifyToken = require('./verifyToken')


router.get('/users', verifyToken(), (req, res) => {
    User.find()
      .select('-password')
      .then(users => {
        res.status(200).json(users);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to fetch users' });
      });
  });

  
  router.delete('/users/:id', verifyToken('admin'), (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.status(200).json({ message: 'User deleted successfully' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to delete user' });
      });
  });
  
  

module.exports = router;
