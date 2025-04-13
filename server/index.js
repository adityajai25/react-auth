const express = require('express');
require('dotenv').config();

const router = require('./routes/authRoutes');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.uri).then(()=>{
    try{
        console.log('Connected to the database');
    }catch(error){
        console.log("Not connected to the database",error);
    }
});
const app = express();
const port = 2000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use('/',router)

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})