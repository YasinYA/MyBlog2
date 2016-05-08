var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

//compare the hashed password and the requested one
function comparePasswords(user, password) {
    return bcrypt.compareSync(password, user.password);
};

//the Users Model
Users = require('./models/admin.js');

module.exports = function(passport) {
    //passport needs to serialize and deserialize user session
    //serialize the user session
    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });
    
    //deserailize the user session
    passport.deserializeUser(function(id, done) {
      Users.findById(id, function(err, user) {
        done(err, user);
      });
    });

    // passport/login.js
    passport.use('login', new LocalStrategy({
        passReqToCallback : true
      },
      function(req, username, password, done) { 
        // check in mongo if a user with username exists or not
        Users.findOne({ 'username' :  username }, 
          function(err, user) {
            // In case of any error, return using the done method
            if (err)
              return done(err);
            // Username does not exist, log error & redirect back
            if (!user){
              console.log('User Not Found with username '+username);
              return done(null, false, 
                    req.flash('message', 'User Not found.'));                 
            }
            // User exists but wrong password, log the error 
            if (!comparePasswords(user, password)){
              console.log('Invalid Password');
              return done(null, false, 
                  req.flash('message', 'Invalid Password'));
            }
            // User and password both match, return user from 
            // done method which will be treated like success
            return done(null, user);
          });
    }));
};