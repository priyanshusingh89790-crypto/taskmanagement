const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    title: String,
    completed: {type:Boolean,default:false},
    userId: String,
    createdAt: {type:Date,default:Date.now},
    
});
module.exports = mongoose.model("Task", taskSchema);