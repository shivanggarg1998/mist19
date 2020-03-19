module.exports = function (app) {
    var controller = require('./controller.js')

    app.route('/questionpage')
        .get(isLoggedIn, controller.questionPage);

    app.route('/userdetail')
        .get(isLoggedIn, controller.userDetail);

    app.route('/admin/addQuestions')
        .post(isLoggedIn, isAdmin, controller.adminaddquestion);

    app.route('/submit')
        .post(isLoggedIn, controller.Submit)

    app.route('/scoreboard')
        .get(isLoggedIn, controller.playerList);

    app.route('/topfifteen')
        .get(isLoggedIn, controller.topFifteen);

};
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.isNotBan == true) {
            // console.log(req);
            return next();
        }
        else {
            console.log('You are banned');
            req.user.current_question = -1;
            res.redirect('/');
        }
    }
    else {
        console.log('User not authenticated in isLoggedIn');
        res.redirect('/');
    }

}

function isAdmin(req, res, next) {
    if (req.user.isAdmin == true) {
        return next();
    }
    else {
        console.log("you dont have permission");
        res.redirect('/');
    }
}
