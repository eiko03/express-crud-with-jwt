const jwt= require('jsonwebtoken');
const Process = require("process");

module.exports=(req,res,next)=>{
    const token = req.header('Authorization');
    if(!token)
        return res.status(401).send('Access Denied');
    try{
        req.user=jwt.verify(token, Process.env.JWT_SECRET);
        next();
    }catch (err){
        res.status(400).json("Invalid Token");
    }

};