var mongoose = require('mongoose')
var question = require('../models/question-model');
var userplayer = require('../models/user-model');
mongoose.Promise = global.Promise;

exports.adminaddquestion = function(req,res){
    var newQuestion = new question({
        question_body: req.body.question_body,
        answer: req.body.answer,
        question_number: req.body.question_number
    })
    newQuestion.save().then(question=>{
        res.json({success:true,msg:'Question saved successfully'})
      }).catch(err=>{
        res.json({success:false,msg:'Quiestion Not saved'})
      })
    // console.log(req.body);
}

exports.userDetail = function(req, res) {
    userplayer
    .findById(req.user._id)
    .then(Userplayer => {
      var player = {
        username: req.user.username,
        googleId: req.user.googleId,
        thumbnail: req.user.thumbnail,
        current_question: req.user.current_question,
        submission_time: req.user.submission_time,
        activity: req.user.activity
      }
      res.json(player)
  
    }).catch(err=>{
      console.log(err)
        res.send("unable to fetch player details")
    })
  }

exports.questionPage = function(req,res){
    question.findOne({question_number: req.user.current_question}).then((quesDetail)=>{
        // console.log(quesDetail);
        var details = {
            question_body: quesDetail.question_body,
            question_number: quesDetail.question_number
        }
        res.json(details)
    }).catch(err=>{
      console.log(err)
      res.send("unable to fetch question from request")
    })
}

exports.playerList = function(req, res) {
    userplayer.find({})
    .then(playerlist=> {

      var userplayerlist = []
      playerlist.sort(     function(a,b){
          if(b.current_question!=a.current_question)
        return  b.current_question - a.current_question;
         return new Date(a.submission_time.toString()) - new Date(b.submission_time.toString());
    });
      for(var i=0;i<playerlist.length;i++){
        //   console.log(playerlist[i].submission_time.toString());
        var playeruser = {
            
            username: playerlist[i].username,
            googleId: playerlist[i].googleId,
            thumbnail: playerlist[i].thumbnail,
            current_question: playerlist[i].current_question,
            rank:i+1
        }
        userplayerlist.push(playeruser)
      }
      res.json(userplayerlist)
  
    }).catch(err=>{
      console.log(err)
      res.send("unable to fetch players list")
    })
  }
  

exports.Submit = function(req,res){
    userplayer
    .findById(req.user._id)
    .then(player=>{
        if(req.user.current_question!=-1){
            question.findOne({question_number: req.user.current_question}).then((quesDetail)=>{
                if(req.body.answer==quesDetail.answer){
                    player.current_question++;
                    player.submission_time=Date.now()
                    player.activity.push({timestamp:Date.now()})
                    player.save()
                    // res.redirect('/question-page');
                    res.json({'success':true, 'msg':'Correct Answer'})
                }
                else{
                    res.json({'success':false, 'msg':'Incorrect Answer'})
                    return
                }
            }).catch(err=>{
              console.log(err)
              res.send("unable to fetch question from request")
            })
        }
        else{
            res.send('you are banned')
        }
    }).catch(err=>{
      console.log(err)
      res.send('unable to fetch player')
    })
}