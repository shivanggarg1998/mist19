const router = require('express').Router();
const passport = require('passport');
var question = require('../models/question-model.js');


router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
}).catch(err=>{
    console.log(err)
    res.send('unable to login')
  });


// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
})).catch(err=>{
    console.log(err)
    res.send('unable to authenticate player')
  });

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    console.log(req.user);
    res.redirect('/question-page');
}).catch(err=>{
    console.log(err)
    res.send('unable to redirect player')
  });



module.exports = router;
