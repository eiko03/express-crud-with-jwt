const router = require ('express').Router();
const User= require('../models/User');


router.post('/register',async(req,res)=>{
    const user= new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try{
        await user.save();
        res.json({"message":"Registration Successful"});
    }
    catch (err){
        res.json(err);
    }

});

module.exports = router;