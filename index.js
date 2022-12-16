const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');
let users=require('./users.json');
const { writeDataToFile }=require('./utilis');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const bodyparser=require('body-parser');
const { getUsers, getUser,createUser,updateUser, deleteUser } = require('./controllers/usercontroller');
const session = require('express-session');
app.set('view engine','ejs');
app.use(express.json())
app.use(session({
    secret:'My name is Haren',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false
}))
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
const PORT=process.env.PORT || 3000;
const verifyUserToken=((req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    const token=req.headers['authorization'].split(' ')[1];
    if(!token){
        return res.status(401).send('Access denied.No token provided');
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded.user;
        next();
    }catch(err){
        res.status(400).send('Invalid token');
    }
});
app.post('/api/register',async(req,res)=>{
    const user=req.body;
    if(!user.email || !user.password){
        return res.status(400).send('Username and password are required');
    }
    const hash=await bcrypt.hash(user.password,10);
    user.password=hash;
    users.push(user);
    writeDataToFile('./users.json',users);
    res.redirect('/');
});
app.get('/login',(req,res)=>{
    res.render('login');
})
app.get('/signup',(req,res)=>{
    res.render('signup');
})
//login route
app.post('/api/login',async(req,res)=>{
    const user=req.body;
    //check if user exists
    const foundUser=users.find((user)=>user.email===req.body.email);
    console.log(foundUser);
    if(!foundUser){
        return res.status(400).send('Invalid email');
    }
    //check if password is correct 
    const isPasswordValid=await bcrypt.compare(user.password,foundUser.password);
    if(!isPasswordValid){
        return res.status(400).send('Invalid password');
    }
    //create token
    const token=jwt.sign({user},process.env.JWT_SECRET,{
        expiresIn:'1h',
    });
    // res.json({token});
    res.redirect('/users');
});
app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/users',(req,res)=>getUsers(req,res));
app.get('/users/:id',(req,res)=>getUser(req,res,req.params.id));
 app.post('/users/add',(req,res)=>createUser(req,res));
// app.post('/users',createUser);
app.post('/users/update/:id',(req,res)=>updateUser(req,res,req.params.id));
app.post('/users/delete/:id',(req,res)=>deleteUser(req,res,req.params.id));
app.listen(PORT,()=>{console.log(`Server is running at ${PORT}`)});

