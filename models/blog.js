var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
    displayName: String,
    Content: String,
    imageUrl: String,
    status: Number
});

BlogSchema.index({displayName: 'text'});
var Blog = mongoose.model('blog', BlogSchema);
module.exports = Blog;