var mongoose = require('mongoose');

var likesSchema  = mongoose.Schema({
	postId: {
		type: String,
		require: true
	},
	likes:  {
		type: Number,
		require: true
	}
});

var Likes = module.exports = mongoose.model('likes', likesSchema);

//getting Post's numbers of likes
module.exports.getLikes = function(callback, limit) {
	Likes.find(callback).limit(limit);
};


//add likes
module.exports.like = function(like, callback) {
	Likes.create(like, callback);
};