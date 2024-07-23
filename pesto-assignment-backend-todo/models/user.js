const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;



const requiredString ={
    type:String,
    required:true
}

const userSchema = new Schema({
    username : requiredString,

    email:{
        type:String,
        unique:true
    },
    password:requiredString
},{
    timestamps:true
})


const User = mongoose.model('User', userSchema);

module.exports = User;