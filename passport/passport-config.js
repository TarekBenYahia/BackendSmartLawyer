
var GoogleStrategy = require('passport-google-oauth20').Strategy;


const passport = require('passport')
const User = require('./../Models/User');
const Setting = require('./../Models/setting');

/************** Google Passport Authentification **************/
passport.use('google', new GoogleStrategy({
    clientID: '281853038106-pl1ug59ggo2rkhuiaou533khet1uelce.apps.googleusercontent.com',
    clientSecret: 'M2kDZXM3ZwhMOV1s3iO6G1eX',
    callbackURL: "http://localhost:4200/apps/calendar"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile._json.email }, function (err, user) {
        if(!user) {
            User.create({email: profile._json.email, roles: 'Avocat'}, function (err, userCreated) {
                console.log("done");
            });
        } else {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let code = '';
                    for (let i = 0; i < 64; i++) {
                        code += characters.charAt(Math.floor(Math.random() * 64));
                    }
            Setting.create({idUser: user._id,code: code }, function(err, response) {
                return done(err, response);
            });
        }
    });
  }
));
