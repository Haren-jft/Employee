const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
const bodyparser=require('body-parser');
const { getUsers, getUser,createUser,updateUser, deleteUser,registerUser,verifyUser } = require('./controllers/usercontroller');
const session = require('express-session');

const PORT=process.env.PORT || 3000;

app.set('view engine','ejs');

app.use(express.json())
app.use(cookieparser())
app.use(session({
    secret:'My name is Haren',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false
}))
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const verifyUserToken=((req,res,next)=>{
    const token = req.cookies.access_token;
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

app.post('/api/register',(req,res)=>registerUser(req,res));
app.get('/login',(req,res)=>res.render('login'))
app.get('/signup',(req,res)=>res.render('signup'))
app.post('/api/login',(req,res)=>verifyUser(req,res));
app.get('/',(req,res)=>res.render('home'));
app.get('/users',verifyUserToken,(req,res)=>getUsers(req,res));
app.get('/users/:id',verifyUserToken,(req,res)=>getUser(req,res,req.params.id));
 app.post('/users/add',verifyUserToken,(req,res)=>createUser(req,res));
app.post('/users/update/:id',verifyUserToken,(req,res)=>updateUser(req,res,req.params.id));
app.post('/users/delete/:id',verifyUserToken,(req,res)=>deleteUser(req,res,req.params.id));

app.post('/api/logout',(req,res)=>{
    res.clearCookie("access_token")
    .status(200)
    res.redirect('/');
})

app.listen(PORT,()=>{console.log(`Server is running at ${PORT}`)});

