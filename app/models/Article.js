var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema ({
    title: String,
    created_date: Date,
    votes: Number,
    author: String
});

module.export = mongoose.model('Article', ArticleSchema);