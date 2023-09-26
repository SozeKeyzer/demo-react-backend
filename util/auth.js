const jwt=require('jsonwebtoken');
     const auth=(req,res,next)=>{
        const authHeader=req.headers.authorization;
        if(authHeader){
            const token=authHeader.split(' ')[1];
            jwt.verify(token,process.env.SECRECT_KEY,(err,user)=>{
                //this user is basically the payload decoed from the token
                if(err){
                    return res.status(401).json("token is not valid");
                }
                req.user=user;
                next();
            });
        }
        else{
            res.status(401).json("you are not authenticated");
        }
    }
module.exports=auth;