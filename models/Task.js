// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To-do', 'In Progress', 'Completed'], default: 'To-do' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
}, { timestamps: true });

// Create Task
taskSchema.methods.createTask = function () {
  return this.save();
};

// Update Task
taskSchema.methods.updateTask = function (updateData) {
  Object.assign(this, updateData);
  return this.save();
};

// Assign Task
taskSchema.methods.assignTask = function (userId) {
  this.assignedTo = userId;
  return this.save();
};

// Mark Task as Complete
taskSchema.methods.markAsComplete = function () {
  this.status = 'Completed';
  return this.save();
};

module.exports = mongoose.model('Task', taskSchema);
