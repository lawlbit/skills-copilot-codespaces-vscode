// Create web server
// Use Express
var express = require('express');
var app = express();

// Use body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use comments.js
var comments = require('./comments.js');

// Create a new comment
app.post('/comments', function(req, res) {
  var newComment = comments.createComment(req.body.message);
  res.json(newComment);
});

// Get all comments
app.get('/comments', function(req, res) {
  res.json(comments.getAllComments());
});

// Get comment by id
app.get('/comments/:id', function(req, res) {
  var comment = comments.getCommentById(req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.json({ message: 'Comment not found' });
  }
});

// Update comment by id
app.put('/comments/:id', function(req, res) {
  var updatedComment = comments.updateComment(req.params.id, req.body.message);
  if (updatedComment) {
    res.json(updatedComment);
  } else {
    res.json({ message: 'Comment not found' });
  }
});

// Delete comment by id
app.delete('/comments/:id', function(req, res) {
  var deletedComment = comments.deleteComment(req.params.id);
  if (deletedComment) {
    res.json(deletedComment);
  } else {
    res.json({ message: 'Comment not found' });
  }
});

// Listen to port 3000
app.listen(3000, function() {
  console.log('Server is running on port 3000');
});