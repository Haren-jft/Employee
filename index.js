const express = require('express')
const cors = require('cors');
const bodyparser=require('body-parser');
const { getUsers, getUser,createUser,updateUser, deleteUser } = require('./controllers/usercontroller');
const app = express()
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
const PORT=process.env.PORT || 3000;
app.get('/users',(req,res)=>getUsers(req,res));
app.get('/users/:id',(req,res)=>getUser(req,res,parseInt(req.params.id)));
 app.post('/users',(req,res)=>createUser(req,res));
// app.post('/users',createUser);
app.put('/users/:id',(req,res)=>updateUser(req,res,parseInt(req.params.id)));
app.delete('/users/:id',(req,res)=>deleteUser(req,res,parseInt(req.params.id)));
app.listen(PORT,()=>{console.log(`Server is running at ${PORT}`)});

