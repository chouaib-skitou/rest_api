// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
}, { timestamps: true });

// Add Comment
commentSchema.methods.addComment = function () {
  return this.save();
};

// Edit Comment
commentSchema.methods.editComment = function (newContent) {
  this.content = newContent;
  return this.save();
};

// Delete Comment
commentSchema.methods.deleteComment = function () {
  return this.deleteOne();
};

module.exports = mongoose.model('Comment', commentSchema);
