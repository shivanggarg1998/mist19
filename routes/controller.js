var mongoose = require('mongoose')
var question = require('../models/question-model');
mongoose.Promise = global.Promise;

exports.adminaddquestion = function(req,res){
    var newQuestion = new question({
        question_body: req.body.question_body,
        media_link: req.body.media_link,
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