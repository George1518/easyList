const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({username: {type:String, required:true, minLength:5}, password: {required: true, type: String,minLength:8}})
module.exports = mongoose.model('User',userSchema)

