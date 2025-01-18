const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters long'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    maxlength: [100, 'Password cannot exceed 100 characters'],
  },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  
  // Friends now store an array of objects with userId and name
  friends: [
    { 
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String }
    }
  ],

  // friendRequests will also store userId and name for the sender
  friendRequests: [
    { 
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String }
    }
  ],
});

// Hash password before saving
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt
    .hash(this.password, 10)
    .then((hashedPassword) => {
      this.password = hashedPassword;
      next();
    })
    .catch((error) => next(error));
});

// Compare password method
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
