const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question_body: String,
    media_link: string,
    answer: string,
    question_number: Number
});

const Question = mongoose.model('question', questionSchema);

module.exports = Question;
