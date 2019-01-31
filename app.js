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
var port = process.env.PORT || 3000;
// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// initialize passport
require('./routes/auth-routes.js')(app, passport);
app.use(passport.initialize());
app.use(passport.session());


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
app.use(express.static(path.join(__dirname, 'dist')));
require('./routes/routers.js')(app);
app.listen(port, () => {
    console.log('app now listening for requests on port 3000');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
    });