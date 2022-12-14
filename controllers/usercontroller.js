const User=require('../models/usermodel');
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
        console.log(user, req.session.edit)
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
    // const user=await User.findById(id);
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
module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}