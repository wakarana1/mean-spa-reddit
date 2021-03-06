var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  title: String, // define data types
  author: String,
  created_at: Date,
  votes: {type:Number, default: 0},
  content: String
});

// defines prehook for document
// before each save the created_at value will be set
ArticleSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Article', ArticleSchema);