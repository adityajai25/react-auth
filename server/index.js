const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const router = require('./routes/authRoutes');
const {mongoose} = require('mongoose');

mongoose.connect(process.env.uri).then(()=>{
    try{
        console.log('Connected to the database');
    }catch(error){
        console.log("Not connected to the database",error);
    }
});
const app = express();
const port = 5000;

app.use(express.json());
app.use('/',router)

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}/login`);
})