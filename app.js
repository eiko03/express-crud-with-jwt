const express = require ('express');
const mongoose = require ('mongoose');
require ('dotenv/config');
const postRoute = require('./routes/post')
const bodyparser= require('body-parser')

const app =express()
app.use(bodyparser.json());
app.use('/posts/',postRoute);





mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>
	console.log("connected")
)
app.listen(8000);