//it deals with data
const db=require('../data/db.json');
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
module.exports={
    findAll,
    findById,
    create
}