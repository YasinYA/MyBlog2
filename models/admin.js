var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var adminSchema = mongoose.Schema({
	username: {
		type: String
	},
	password: {
		type: String
	}
});

adminSchema.plugin(passportLocalMongoose);

var admin = module.exports = mongoose.model('users', adminSchema);