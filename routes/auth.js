const router = require ('express').Router();
const User= require('../models/User');
const bcrypt= require('bcryptjs');


router.post('/register',async(req,res)=>{

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



});


router.post('/login',async(req,res)=>{

});

module.exports = router;