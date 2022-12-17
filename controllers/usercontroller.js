const User=require('../models/usermodel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
//@desc get all the users
async function getUsers(req,res){
    try {
        const users=await User.findAll();
        if(typeof req.session.edit !== 'object'){req.session.edit=false;}
        res.render('index',{
            users,
            edit:req.session.edit
        })
    } catch (error) {console.log(error);}
}
//@desc get single user
async function getUser(req,res,id){
    try {
        const user=await User.findById(id);
        // res.json(user);
        req.session.edit=user;
        console.log(req.session.edit);
        res.redirect('/users')
    } catch (error) {console.log(error);}
}
//@desc      create user
async function createUser(req,res){
    try {    
        console.log("Edit se aarha hu");
        const user=req.body;
        const newUser=await User.create(user);
        res.redirect('/users');
    } catch (error) {console.log(error);}
}
//@desc      update user
async function updateUser(req,res,id){
        try {
            const user_data=req.body;
            const updUser=await User.update(id,user_data);
            req.session.edit=false;
            res.redirect('/users');
        } catch (error) {console.log(error);}    
    }
async function deleteUser(req,res,id){
    try {
        await User.remove(id);
        res.redirect('/users');
    } catch (error) {console.log(error);}
}
async function registerUser(req,res){
    const user=req.body;
    if(!user.email || !user.password){
        return res.status(400).send('Username and password are required');
    }
    const hash=await bcrypt.hash(user.password,10);
    user.password=hash;
    await User.register(user);
    res.redirect('/');
}
async function verifyUser(req,res){
    const user=req.body;
    //check if user exists
    const foundUser=await User.verify(user);
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
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }).status(200)
    res.redirect('/users');
}
module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    registerUser,
    verifyUser
}