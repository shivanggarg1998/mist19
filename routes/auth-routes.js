
module.exports = function(app, passport) {
    app.get('/login', (req, res) => {
        res.render('login', { user: req.user });
    });
    
    // auth logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    // auth with google+
    app.get('/auth/google',
  passport.authenticate('google', { scope: 
      [ 'profile','email' ] }
));
    
    // callback route for google to redirect to
    // hand control to passport to use code to grab profile info
    app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
        // res.send(req.user);
        console.log(req.user);
        res.redirect('/question-page');
    });
}