//it deals with data
const mysql=require('mysql');
// const { writeDataToFile }=require('../utilis');
//create connection
const dbs=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'emp_db'
});
//connect
dbs.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql Connected');
});
// let db=require('../data/db.json');
function findAll(){
    return new Promise((resolve,reject)=>{
        let sql='SELECT * FROM Employee';
        dbs.query(sql,(err,result)=>{
        if(err) throw err;
        resolve(result);
        });
    })
}
function findById(id){
    return new Promise((resolve,reject)=>{
        let sql=`SELECT * FROM Employee WHERE id=${id}`;
        dbs.query(sql,(err,result)=>{
        if(err) throw err;
        resolve(result);
    });
    })
}
function create(user){
    return new Promise((resolve,reject)=>{
    let sql='INSERT INTO Employee SET ?';
    dbs.query(sql,user,(err,result)=>{
        if(err) throw err;
        resolve(result); 
    });
    });
}
function update(id,user_new){
    return new Promise((resolve,reject)=>{
        // let post={title:'Updated title',body:'Haren'};
    let sql=`UPDATE Employee SET ? WHERE id=${id}`;
    dbs.query(sql,user_new,(err,result)=>{
        if(err) throw err;
        resolve(result);
    });
        // const index=db.findIndex((emp)=>emp.id==id);
        // db[index].name=user_new.name;
        // db[index].job=user_new.job;
        // db[index].salary=user_new.salary;
        // writeDataToFile('./data/db.json',db);
        // resolve(db[index]);
    });
}
function remove(id){
    return new Promise((resolve,reject)=>{
        let sql=`DELETE FROM Employee WHERE id=${id}`;
    dbs.query(sql,(err,result)=>{
        if(err) throw err;
        resolve();
    });
    });
}
module.exports={
    findAll,
    findById,
    create,
    update,
    remove
}