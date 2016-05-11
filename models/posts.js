var mongoose = require('mongoose');

var postsSchema = mongoose.Schema({
	author: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	createddate: {
		type: Date,
		default: Date.now
	}
});

var posts = module.exports = mongoose.model('posts', postsSchema);

//getting the posts
module.exports.getPosts = function(callback, limit) {
	posts.find(callback).limit(limit);
};

//getting only one post
module.exports.getPost = function(id, callback) {
	posts.findById(id, callback);
};

//adding a post
module.exports.addPost = function(post, callback) {
	posts.create(post, callback);
};

//updating a post
module.exports.editPost = function(id, post, option, callback) {
	var query = {_id: id};
	var update =  {
		author : post.author,
		title : post.title,
		image: post.image,
		category: post.category,
		content: post.content
	};

	posts.findOneAndUpdate(query, update, option, callback);
};

//removing post
module.exports.removePost = function(id, callback) {
	var query = {_id: id};
	posts.remove(query, callback);
};