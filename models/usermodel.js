//it deals with data
let db=require('../data/db.json');
const { writeDataToFile }=require('../utilis');
function findAll(){
    return new Promise((resolve,reject)=>{
        resolve(db);
    })
}
function findById(id){
    return new Promise((resolve,reject)=>{
        const user=db.find((emp)=>emp.id==id);
        console.log(id);
        console.log(user);
        resolve(user);
    })
}
function create(user){
    return new Promise((resolve,reject)=>{
        let uid=Math.max(...db.map(o => o.id));
        uid++;
        const newProduct={id:uid,...user};
        db.push(newProduct);
        writeDataToFile('./data/db.json',db);
        resolve(newProduct);
    });
}
function update(id,user_new){
    return new Promise((resolve,reject)=>{
        const index=db.findIndex((emp)=>emp.id==id);
        db[index].name=user_new.name;
        db[index].job=user_new.job;
        db[index].salary=user_new.salary;
        writeDataToFile('./data/db.json',db);
        resolve(db[index]);
    });
}
function remove(id){
    return new Promise((resolve,reject)=>{
        const index=db.findIndex((emp)=>emp.id==id);
        db.splice(index,1);
        writeDataToFile('./data/db.json',db);
        resolve();
    });
}
module.exports={
    findAll,
    findById,
    create,
    update,
    remove
}