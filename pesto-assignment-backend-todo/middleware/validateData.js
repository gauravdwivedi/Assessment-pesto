const { body, validationResult} = require('express-validator');


exports.validateTodo=[
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    (req,res,next) =>{
        console.log(req.body,'REQQQ')
        const errors = validationResult(req);
        console.log(errors,'Errors')
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() });
        }
        next();
    }
];