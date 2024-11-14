// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, enum: ['New Comment', 'RSVP Update', 'Task Assigned'], required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

// Send Notification
notificationSchema.methods.sendNotification = function () {
  return this.save();
};

// Mark as Read
notificationSchema.methods.markAsRead = function () {
  this.isRead = true;
  return this.save();
};

module.exports = mongoose.model('Notification', notificationSchema);
