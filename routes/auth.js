const router = require ('express').Router();
const User= require('../models/User');


router.post('/register',async(req,res)=>{

    const user= new User(req.body);
    const valodationerror=user.validateUser(req.body)

    console.log(valodationerror);
    if(valodationerror.error ){
        res.status(422).json(valodationerror.error["details"]);

    }
    else{
        const user= new User(req.body);
        const createdUser=await user.save();
        res.status(201).json(createdUser);
    }



});

module.exports = router;