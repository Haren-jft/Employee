//it deals with data
const Sequelize= require('sequelize');
const sequelize = new Sequelize(
   'emp_db',
   'root',
   'password',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );
sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

const emp = sequelize.define("Employees", {   
    name: {
     type: Sequelize.STRING,
     allowNull: false
   },
   job: {
     type: Sequelize.STRING,
     allowNull: false
   },
   salary: {
     type: Sequelize.STRING,
     allowNull:false
   }
});

sequelize.sync().then(() => {
   console.log('Employee table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});
function findAll(){
    return new Promise((resolve,reject)=>{
        sequelize.sync()
        .then(() => {
            emp.findAll()
            .then(res => {
                resolve(res);
            })
            .catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
        })
        .catch((error) => {
            console.error('Unable to create table : ', error);
        });
    });       
}
function findById(id){
    return new Promise((resolve,reject)=>{
        sequelize.sync()
        .then(() => {
            emp.findOne({
                where: {
                    id : id
                }
            }).then(res => {
                resolve(res);
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
        
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    })
}
function create(user){
    return new Promise((resolve,reject)=>{
        sequelize.sync()
        .then(() => {
            emp.create(user)
            .then(res => {
                resolve(res)
            }).catch((error) => {
                console.error('Failed to create a new record : ', error);
            });
         })
         .catch((error) => {
            console.error('Unable to create table : ', error);
         });
});
}
function update(id,user_new){
    return new Promise((resolve,reject)=>{
        sequelize.sync()
        .then(()=>{
            emp.update(user_new,{where:{id:id}})
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.error('Failed to update record : ', error);
            });
        })
    });
}
function remove(id){
    return new Promise((resolve,reject)=>{
        sequelize.sync()
        .then(() => {
            emp.destroy({
                where: {
                  id: id
                }
            }).then(() => {
                resolve()
            }).catch((error) => {
                console.error('Failed to delete record : ', error);
            });
          
          }).catch((error) => {
              console.error('Unable to create table : ', error);
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