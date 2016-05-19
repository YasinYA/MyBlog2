var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	postId: {
		type: String,
		required: true
	},
	image: {
		type: String
	},
	createddate: {
		type: Date,
		default: Date.now
	}
});

var Comments = module.exports = mongoose.model('visitors', commentSchema);

//getting the comments
module.exports.getComments = function(callback, limit) {
	Comments.find(callback).limit(limit);
};

//single post comments
module.exports.getPostComments = function(id, callback) {
	Comments.find({postId: id}, callback);
}
//adding a comments
module.exports.addComment = function(comment, callback) {
	Comments.create(comment, callback);
};