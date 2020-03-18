const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const bodyParser = require('body-parser');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const path = require('path');
const app = express();
var port = process.env.PORT || 80;
const rateLimit = require("express-rate-limit");
 

 
//  apply to all requests

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));
app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
require('./config/passport-setup')(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// initialize passport

app.use(passport.initialize());
app.use(passport.session());
require('./routes/auth-routes.js')(app, passport);

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
// app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    if(req.user){
        // console.log(req.user.current_question);
        res.redirect('/question-page');
        // res.send('hi');
    }
    else{
        res.sendFile(__dirname+'/views/login.html', { user: req.user });
    }
});
// app.get('/', (req, res) => {
    // if(req.user){
        // console.log(req.user.current_question);
        // res.sendFile(__dirname+'/views/coming.html');
        // res.send('hi');
    // }
    // else{
    //     res.sendFile(__dirname+'/views/login.html', { user: req.user });
    // }
// });
app.use(express.static(path.join(__dirname, 'dist')));
require('./routes/routers.js')(app);
app.listen(port, () => {
    console.log('app now listening for requests on port 3000');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
    });