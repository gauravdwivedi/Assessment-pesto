'use strict';
const Todo = require('../../../models/todo');



//Add TODO
module.exports.add = async function(req,res){
    try{

        const { title, description,status} = req.body;
        const userId = req.user?.user?._id;

        console.log(req.user?.user?._id,'COntroller')
        

        const todo = await Todo.create({
            user:userId,
            title:title,
            description:description,
            status:status
        });

        return res.status(200).json({
            success:true,
            message:todo
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


//Edit Todo
module.exports.edit = async function(req,res){
    try{
        const {id} = req.params;

        const {title,description,status}= req.body;

        const todo = await Todo.findByIdAndUpdate(id,{
                    title, description,status
        })

        return res.status(200).json({
            success:true,
            message:todo
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


//Delete Todo
module.exports.delete = async function(req,res){
    try{

        const {id}= req.params;

        const todo = await Todo.findByIdAndDelete(id)

        return res.status(200).json({
            success:true,
            message:todo
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


//list tasks
module.exports.list = async function(req,res){
    try{
        const id= req.user?.user?._id
            const tasks = await Todo.find({user:id});
            console.log(tasks,'Tasks');
            
            return res.status(200).json({
                succes:true,
                message:tasks
            })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}