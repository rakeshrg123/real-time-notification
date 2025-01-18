var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const verifyToken = require('./verifyToken');


router.post('/add-user', verifyToken('admin'),(req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and Confirm Password do not match' });
    }
  
    // Validate required fields
    const user = new User({ name, email, password });
    const validationError = user.validateSync();
  
    if (validationError) {
      return res.status(400).json({ error: validationError.errors });
    }
  
    // Check if the email is already taken
    User.findOne({ email })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).json({ message: 'Email already taken' });
        }
  
    
        return user.save();
      })
      .then((newUser) => {
        // Respond with success
        res.status(201).json({ message: 'User added successfully', user: newUser });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });
  



  router.post('/login', (req, res) => {   
    const { email, password } = req.body;

    if (!email && !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }



    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            user.comparePassword(password)
                .then((isMatch) => {
                    console.log(isMatch)
                    if (!isMatch) {
                        return res.status(401).json({ error: 'Invalid credentials' });
                    }

                    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.json({ token  ,     user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                      }});
                })
                .catch((err) => res.status(400).json({ error: err.message }));
        })
        .catch((err) => res.status(400).json({ error: err.message }));

    });

  
module.exports = router;

