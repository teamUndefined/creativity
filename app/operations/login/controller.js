var model = require("./model");
var ObjectId = model.ObjectId;
var request = require('request');
var _SECRET = '35b6e3dae1b5b8371ed0103a5a2c2fca';
var _APP_ID = '147468168948647';

// passport facebook API
var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;

// configure passport
passport.use(new FacebookStrategy ({
    clientID: _APP_ID,
    clientSecret: _SECRET
}, loginFBuser));

// facebook login
exports.facebookLogin = function (source) {
    passport.authenticate("facebook", { 
        scope : ["email", "public_profile"],
        callbackURL: "/@/auth/facebook/callback/"
    })(source.req, source.res, source.next);
}

// facebook login callback
exports.facebookCallback = function (source) {

    passport.authenticate("facebook", {
        callbackURL: "/@/auth/facebook/callback/"
    }, function (err, user) {

        if (err) {
            console.error("Error occured while logging in", err);
            return source.res.redirect("")
        }

        // get the user role (if it exists)
        var role = (user.role) ? user.role : null;
        
        var login = {
            role: role,
            _id: user._id,
            facebook_uid: user.facebook_uid,
            name: user.name
        };

        // set session
        source.res.cookie("login", login, { maxAge: 1000 * 60 * 60 * 24 * 365, signed: true });

        // handle redirect values
        var redirect = "/";

        // end
        source.res.redirect(redirect);
    })(source.req, source.res, source.next);
};

function loginFBuser (access_token, refreshToken, profile, done) {

    // validate user profile
    if (!profile || !profile._json || !profile._json.id) {
        return done("Invalid user profile");
    }

    // build data object
    var data = {
        facebook_uid: profile._json.id,
        name: profile._json.name,
        email: profile._json.email || null
    };

    // check if user is in db
    model.findUser({ facebook_uid: data.facebook_uid }, function (err, user) {
        
        if (err) {
            return done(err);
        }

        if (user) {
        	return done(null, user);
        }

        // register user
        var user = {
        	facebook_uid: data.facebook_uid,
        	name: data.name,
        	email: data.email,
        	role: "user"
        };
        model.registerUser(user, function (err) {

        	if (err) {
        		return done(err);
        	}

        	done(null, user);
        });
    });
};

exports.logout = function (source) {

    if (!source.req.signedCookies.login) {
        return source.res.status(400).send('User not logged in.');
    }

    // delete session
    source.res.clearCookie("login");

    // redirect to login page
    source.res.status(200).send();
};