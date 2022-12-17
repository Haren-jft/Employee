const Employees=require('./Employee');
const Users=require('./Users');
// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set('strictQuery',false);

const mongoDB = "mongodb+srv://haren:1234@cluster0.r9lqzcq.mongodb.net/emp_db?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
function register(user){
    return new Promise(async(resolve,reject)=>{
        try{
            await Users.create(user);
            resolve();
        }
        catch(err){
            console.log(err)
        }
});
}
async function verify(user){
    return new Promise(async(resolve,reject)=>{
        try{
            const res=await Users.findOne({ email: user.email }).exec();
            resolve(res);
        }
        catch(err){
            console.log(err)
        }
});
}
function findAll(){
    return new Promise(async(resolve,reject)=>{
        try{
        const res=await Employees.find({});
        resolve(res);
        }
        catch(err){
            console.log(err);
        }
    });       
}
function findById(id){
    return new Promise(async(resolve,reject)=>{
        try{
        const res=await Employees.findById(id).exec();
        resolve(res);
        }
        catch(err){
            console.log(err)
        }
    })
}
function create(user){
    return new Promise(async(resolve,reject)=>{
        try{
            const res=await Employees.create(user);
            resolve(res);
        }
        catch(err){
            console.log(err)
        }
});
}
function update(id,user_new){
    return new Promise(async(resolve,reject)=>{
        try{
            const res=await Employees.findByIdAndUpdate(id,user_new);
            resolve(res);
        }
        catch(err){
            console.log(err);
        }
    });
}
function remove(id){
    return new Promise(async(resolve,reject)=>{
        try{
            await Employees.findByIdAndDelete(id);
            resolve();
        }
        catch(err){
            console.log(err);
        }
    });
}
module.exports={
    findAll,
    findById,
    create,
    update,
    remove,
    register,
    verify
}