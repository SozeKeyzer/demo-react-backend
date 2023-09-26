//this file can be used to remove generation of userController.
//currently not used

const generateAccessToken=(user)=>{
   return jwt.sign({id:user.id,isAdmin:user.admin},
        process.env.SECRECT_KEY,
        { expiresIn:"20s"} 
        );
}

const generateRefreshToken=(user)=>{
    return jwt.sign({id:user.id,isAdmin:user.admin},
        process.env.REFRESH_SECRECT_KEY);
}

module.exports={
    generateAccessToken,
    generateRefreshToken
}