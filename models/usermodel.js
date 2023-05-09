const mysql=require('mysql');

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
    let sql=`UPDATE Employee SET ? WHERE id=${id}`;
    dbs.query(sql,user_new,(err,result)=>{
        if(err) throw err;
        resolve(result);
    });
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