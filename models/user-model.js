const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    current_question: { type: Number, default: 0 },
    submission_time: { type: Date, default: Date.now },
    isNotBan: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
