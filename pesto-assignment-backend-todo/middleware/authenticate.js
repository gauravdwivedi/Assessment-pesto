const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        console.log('Auth Header',token)

        jwt.verify(token,'todo-app-secret', (err,user)=>{
            console.log('USER',user);
            if(err){
                return res.sendStatus(403);
            }

            req.user= user;
            next();
        })
    }else{
        res.sendStatus(401);
    }
};