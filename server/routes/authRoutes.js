const express = require('express');
const router = express.Router();
const cors = require('cors');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

router.use(cors(
    {
        credentials: true,
        origin: process.env.furl
    }
))

router.get('/',(req,res)=>{
    res.json('Server is running');
})

router.get('/login',async(req,res)=>{
    res.json('Login API');
});

router.get('/signup',async(req,res)=>{
    res.json('Signup API');
});

router.get('/signup',async(req,res)=>{
    try{
        const users = await user.find({});
        res.json(users);
    }catch(error){
        console.log(error);
    }
})

router.post('/signup',async(req,res)=>{
    try{
        const {fname,lname,email,password,cpassword,city} = req.body;
        if(!fname){
            return res.status(422).json({error:'Please enter your first name'});
        }
        if(!lname){
            return res.status(422).json({error:'Please enter your last name'});
        }
        if(!email){
            return res.status(422).json({error:'Please enter your email'});
        }
        const exist = await user.findOne({email:email});

        if(exist){
            return res.status(422).json({error:'User already exists'});
        }
        if(!password){
            return res.status(422).json({error:'Please enter your password'});
        }
        if(!cpassword){
            return res.status(422).json({error:'Please confirm your password'});
        }
        if(password !== cpassword){
            return res.status(422).json({error:'Passwords do not match'});
        }
        if(!city){
            return res.status(422).json({error:'Please enter your city'});
        }

        const newuser = await user.create({fname,lname,email,password,city});
        res.json({message:'Signup successful!'});
        res.json(newuser);

    }catch(error){
        console.log(error);
    }
})

router.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    try{
        const users = await user.findOne({email});
        if(!users){
            return res.status(422).json({
                error: "User email doesnot exists.."
            })
        }
        if(users.password !== password){
            return res.status(422).json({
                error: "Password is incorrect"
            })
        }
        const username = users.fname;
        const token = jwt.sign({ userId: users._id, username:users.fname }, process.env.jwt_key, { expiresIn: '10s' });

        console.log(username)
        if(users.email === req.body.email && users.password === req.body.password){
            return res.status(200).json({
                message: "Login successful!",
                username: username,
                token
            })
        }
        
    }catch(error){
        console.log(error);
    }
})

router.post('/protected', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided.' });
    }

    jwt.verify(token, process.env.jwt_key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token is expired or invalid.' });
        }
        // Token is valid
        res.status(200).json({ message: 'Access granted!', userId: decoded.userId,username:decoded.username });
    });
});

module.exports = router;