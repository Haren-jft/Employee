const User=require('../models/usermodel');
//@desc get all the users
async function getUsers(req,res){
    try {
        const users=await User.findAll();
        res.json(users);
    } catch (error) {console.log(error);}
}
//@desc get single user
async function getUser(req,res,id){
    try {
        const user=await User.findById(id);
        res.json(user);
    } catch (error) {console.log(error);}
}
//@desc      create user
async function createUser(req,res){
    try {    
        const user=req.body;
        const newUser=await User.create(user);
        res.json(newUser);
    } catch (error) {console.log(error);}
}
//@desc      update user
async function updateUser(req,res,id){
    const user=await User.findById(id);
        try {
            const user_data=req.body;
            const updUser=await User.update(id,user_data);
            res.json(updUser);
        } catch (error) {console.log(error);}    
    }
async function deleteUser(req,res,id){
    try {
        await User.remove(id);
        res.json({message:`User ${id} removed`})
    } catch (error) {console.log(error);}
}
module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}