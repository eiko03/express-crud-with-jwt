const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register =async(req,res)=>{

    const user= new User(req.body);
    const validationError=user.validateUserRegistration(req.body);
    const emailExistsError= await User.findOne({email:req.body.email});

    if(validationError.error )
        res.status(422).json(validationError.error.details[0].message);

    else if(emailExistsError)
        res.status(409).json("Email Already Exists");

    else{
        const salt=await bcrypt.genSalt(15);
        req.body.password =await bcrypt.hash(req.body.password, salt);
        const user= new User(req.body);
        try{
            const createdUser=await user.save();
            res.status(201).json({"message":"User Successfully Registered",name:createdUser.name});
        }
        catch (err){
            res.json(err);
        }
    }
}

const login = async(req,res)=>{
    const user= await User.findOne({email:req.body.email});
    const validationError=user.validateUserLogin(req.body);
    if(validationError.error )
        res.status(422).json(validationError.error.details[0].message);

    else if(!user)
        res.status(401).json("Email Doesn\'t Exists");

    else{
        const passwordValidation=await bcrypt.compare(req.body.password,user.password);
        if(!passwordValidation)
            res.status(401).json("Invalid Credentials");

        try{
            const token=await jwt.sign({__id: user.__id}, process.env.JWT_SECRET);
            res.header('Authorization',token).status(200).json({"Authorization":token});
        }
        catch (err){
            res.json(err);
        }
    }
}

module.exports ={
    register,login
};