const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });
const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    current_question: { type: Number, default: 1 },
    submission_time: { type: Date,default: Date.now() },
    isNotBan: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    activity: [{timestamp:{
        type: Date, default:Date.now()
    }}]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
