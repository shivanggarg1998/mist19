module.exports = function(app) {
    var controller = require('./controller.js')
    
    //============================================================================
    //Admin routes ===============================================================
    //============================================================================
    
    
    

    app.route('/admin/addQuestions')
        .post(isLoggedIn, isAdmin,controller.adminaddquestion);
    
    // app.route('/admin/modifyCompany/:id')
    //     .post(isLoggedIn, isAdmin,controller.modifyCompany);
    
    
    

    };
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            if(req.user.isNotBan==true){
                // console.log(req);
                return next();
            }
            else{
                console.log('You are banned');
                req.user.current_question = -1;
                res.redirect('/');
            }    
        }
        else{
                console.log('User not authenticated in isLoggedIn');
                res.redirect('/');
            }
    
    }
    
    function isAdmin(req, res, next){
        if(req.user.isAdmin == true){
            return next();
        }
        else{
            console.log("you dont have permission");
            res.redirect('/');
        }
    }
    