const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema} = mongoose;



const todoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['To Do','In Progress','Done'],
        default:'To DO'
    },

},{
    timestamps:true
})



const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;


