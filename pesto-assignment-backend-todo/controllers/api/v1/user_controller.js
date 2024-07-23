'use strict';

const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.register = async function(req,res){
    try{

        const saltRounds = 10;
        let newPassword;

        const { username, email, password} = req.body;
        
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });


        return res.status(200).json({
            success:true,
            message:user
        });

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports.login = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
        
        if(user){
            const match = await bcrypt.compare(req.body.password, user.password);

            if(match){
                jwt.sign({user},'todo-app-secret',{expiresIn:'10000s'},(err,token)=>{
                    res.json({
                        token
                    });
                })
            }else{
                return res.status(500).json({
                    success:false,
                    message:"Check username or password!"
                })
            }
        }else{
            return res.status(500).json({
                success:false,
                message:"User Doesn't exist!"
            })
        }

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
