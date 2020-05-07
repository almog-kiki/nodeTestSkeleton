const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email       : {type: String, required: true, unique: true},
    firstName    : String,
    lastName  : String
});

module.exports = mongoose.model('User', UserSchema);