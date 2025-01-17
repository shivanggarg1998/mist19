const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(null, user);
        }).catch(err => {
            console.log(err)
            res.send('unable to fetch player')
        });;
    });

    passport.use(
        new GoogleStrategy({
            // options for google strategy
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: '/auth/google/redirect'
        }, (accessToken, refreshToken, profile, done) => {
            // check if user already exists in our own db
            User.findOne({ googleId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    // already have this user
                    // console.log('token start');
                    // console.log(accessToken);
                    // console.log('token end');
                    //console.log('user is: ', currentUser);
                    done(null, currentUser);
                } else {
                    // if not, create user in our db
                    //console.log(profile);
                    new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        thumbnail: profile._json.picture
                    }).save().then((newUser) => {
                        console.log('created new user: ', newUser);
                        done(null, newUser);
                    });
                }
            }).catch(err => {
                console.log(err)
                res.send('unable to fetch player')
            });
        })
    );

}
