const mongoose = require('mongoose');
const { db } = require('./users');
const todoSchema = new mongoose.Schema({task: {type: String, required:true}, completed:{type:Boolean,default:false},userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true}})
module.exports =  mongoose.model('Task',todoSchema)

