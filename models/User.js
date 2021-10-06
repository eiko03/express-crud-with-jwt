const mongoose = require ('mongoose');
const Joi = require('joi');

const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        min:5,
        required:true
    },
    date: {
        type:String,
        default:Date.now
    }
});

userSchema.methods.validateUser = (obj)=> {
    const validationSchema = Joi.object({
        name: Joi.string().min(6).max(30).required(),
        password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
        email: Joi.string().email().required()
    });
    return validationSchema.validate(obj);
};


module.exports = mongoose.model('User',userSchema)