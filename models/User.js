// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Organizer', 'Participant'], required: true }
}, { timestamps: true });

// Register method
userSchema.methods.register = async function () {
  this.password = await bcrypt.hash(this.password, 10);
  return this.save();
};

// Login method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  throw new Error('Invalid email or password');
};

// Update profile method
userSchema.methods.updateProfile = function (updateData) {
  Object.assign(this, updateData);
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
