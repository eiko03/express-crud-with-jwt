const express = require ('express');
const mongoose = require ('mongoose');
require ('dotenv/config');
const postRoute = require('./routes/post')
const authRoute = require('./routes/auth')
const bodyparser= require('body-parser')

const app =express();
app.use(bodyparser.json());
app.use('/posts/',postRoute);
app.use('/auth/',authRoute);





mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>
	console.log("connected")
)
app.listen(process.env.PORT);