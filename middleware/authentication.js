const jwt = require("jsonwebtoken");
require("dotenv").config();
const authentication=async(req,res,next)=>{
    const token = req?.headers?.authorization.split(" ")[1];
    try {
        jwt.verify(token, process.env.PRIVATE_KEY, function(err, code) {
            if(!err&&code){
                req.body.userId=code.userId
                req.body.role=code.role
                req.body.dealerName=code.userName
                next();
            }else{
                return res.status(401).json({msg:"You are not Authorized for this Action !"})
            }
        });
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error !"})
        
    }
}


module.exports={
    authentication
}