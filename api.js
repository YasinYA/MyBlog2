///////////////////////////////////////////
//	Requiring Modules
//////////////////////////////////////////
var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	flash = require('connect-flash'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	router = express.Router();
///////////////////////////////////////////
//	Requiring Passport Local Strategy
//////////////////////////////////////////
var passportAuth = require('./auth.js')(passport);
///////////////////////////////////////////
//	Requiring  Database Schemas
//////////////////////////////////////////
var Posts = require('./models/posts.js');
var Comments = require('./models/comments.js');
var Likes = require('./models/likes.js');

///////////////////////////////////////////
//	Database Connection
//////////////////////////////////////////
mongoose.connect('mongodb://localhost/blogdb');
var db = mongoose.connection;

///////////////////////////////////////////
//	Access Controller
//////////////////////////////////////////
function loggedIn(req, res, next) {
	if(req.user) {
		next();
	} else {
		res.redirect('/admin');
	}
};

///////////////////////////////////////////
//	Router Configuration
//////////////////////////////////////////
router	
	.use(morgan('dev'))//log every request to the console
	.use(cookieParser())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended: false}))
	.use(session({
		secret: 'ilovescotchscotchyscotchscotch',
		resave: false,
		saveUninitialized: false
	}))// session secret
	.use(passport.initialize()) 
	.use(passport.session())//persistent login sessions
	.use(flash());//connect flash for flash messages

///////////////////////////////////////////
//	API
//////////////////////////////////////////
router
	/////////////////////
	//	Login Route
	////////////////////
	.route('/admin')
	.get(function(req, res) {
		res.sendFile(__dirname + '/app/admin.html');
	})
	.post(passport.authenticate('login'), function(req, res) {
		res.sendStatus(200);
	});

router
	/////////////////////
	//	Dashboard route
	////////////////////
	.route('/dashboard')
	.get(loggedIn, function(req, res) {
		res.status(200).json({success: 'Authorized'});
	});

router
	/////////////////////
	//	Logout route
	////////////////////
	.route('/logout')
	.get(function(req, res) {
		req.logout();
		res.redirect("/");
	});

router
	////////////////////////////////////
	//	Getting Posts and Adding Posts
	///////////////////////////////////
	.route('/posts')
	.get(function(req, res) {
		Posts.getPosts(function(err, posts) {
			if(err) {
				throw err;
			}
			res.json(posts);
		});
	})
	.post(function(req, res) {
		var newPost = req.body;
		Posts.addPost(newPost, function(err, post) {
			if(err) {
				throw err;
			}
			res.json(post);
		});
	});

router
	/////////////////////////////////////////////
	//	Getting Single Post, Editing , deleting
	/////////////////////////////////////////////
	.route('/post/:id')
	.get(function(req, res) {
		Posts.getPost(req.params.id, function(err, post) {
			if(err) {
				throw err;
			}
			res.json(post);
		});
	})
	.put(function(req, res) {
		var id = req.params.id;
		var post = req.body;
		Posts.editPost(id, post, {}, function(err, post) {
			if(err) {
				throw err;
			}
			res.json(post);
		});
	})
	.delete(function(req, res) {
		var id = req.params.id;
		Posts.removePost(id, function(err, post) {
			if(err) {
				throw err;
			}
			res.json(null);
		});
	});

router
	/////////////////////////////////////////////
	//	Comments
	/////////////////////////////////////////////
	.route('/comments')
	.get(function(req, res) {
		Comments.getComments(function(err, comment) {
			if(err) throw err;
			res.json(comment);
		});
	})
	.post(function(req, res) {
		var newComment = req.body;
		Comments.addComment(newComment, function(err, comment) {
			if(err) throw err;
			res.json(comment);
		});	
	});

router
	/////////////////////////////////////////////
	//	Single Post Comments
	/////////////////////////////////////////////
	.route('/comments/:id')
	.get(function(req, res) {
		var id = req.params.id;
		Comments.getPostComments(id, function(err, comment) {
			if(err) {
				throw err;
			}
			res.json(comment);
		});
	});

router
	/////////////////////////////////////////////
	//	Likes
	/////////////////////////////////////////////	
	.route('/likes')
	.post(function(req, res) {
		var newLikes = req.body;
		Likes.like(newLikes, function(err, likes) {
			if(err) {
				throw err;
			}
			res.json(likes);
		});
	});

router
	/////////////////////////////////////////////
	//	Single Post Likes
	/////////////////////////////////////////////
	.route('/postlikes/:id')
	.get(function(req, res) {
		var id = req.params.id;
		Likes.getLikes(id, function(err, likes) {
			if(err) {
				throw err;
			}
			res.json(likes);
		});
	})

module.exports = router;