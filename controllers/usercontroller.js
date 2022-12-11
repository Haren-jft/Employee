const User=require('../models/usermodel');
//@desc get all the users
//@route /api/users
async function getUsers(req,res){
    try {
        const users=await User.findAll();
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
}
//@desc      get single user
//@route     GET /api/users/:id
async function getUser(req,res,id){
    try {
        const user=await User.findById(id);
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
}
//@desc      create user
//@route     Post /api/users
async function createUser(req,res){
    try {
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk;
        })
        req.on('end',async()=>{
            const {name,job,salary}=JSON.parse(body);
            const user={
                name,
                job,
                salary 
            }
            const newUser=await User.create(user);
            console.log(newUser);
            res.writeHead(201,{'Content-Type':'application/json'})
            res.end(JSON.stringify(newUser));
        })
    } catch (error) {
        console.log(error);
    }
}
//@desc      update user
//@route     Put /api/users
async function updateUser(req,res,id){
    const user=await User.findById(id);
    if(!user){
        res.writeHead(404,{'Content-Type':'application/json'})
        res.end(JSON.stringify({message:'User Not Found'}))
    }
    else{
        try {
            let body='';
            req.on('data',(chunk)=>{
                body+=chunk;
            })
            req.on('end',async()=>{
                const {name,job,salary}=JSON.parse(body);
                const user_data={
                    name:name || user.name,
                    job:job || user.job,
                    salary:salary || user.salary 
                }
                const updUser=await User.update(id,user_data);
                res.writeHead(200,{'Content-Type':'application/json'})
                res.end(JSON.stringify(updUser));
            })
        } catch (error) {
            console.log(error);
        }    
    }
}
async function deleteUser(req,res,id){
    try {
        console.log('demo')
        console.log(id);
        await User.remove(id);
        console.log('demo')
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:`User ${id} removed`}));
    } catch (error) {
        console.log(error);
    }
}
module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}