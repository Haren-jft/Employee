const http=require('http');
const { getUsers,getUser,createUser,updateUser,deleteUser }=require('./controllers/usercontroller');
const PORT=process.env.PORT || 3000;
const server=http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, content-type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if(req.method==='OPTIONS'){
        res.writeHead(200);
        res.end();
    }
    else if(req.url==='/users' && req.method==='GET'){
        getUsers(req,res);
    }
    else if(req.url.match(/\/users\/([0-9]+)/) && req.method==='GET'){
        const id=req.url.split('/')[2];
        getUser(req,res,id);
    }
    else if(req.url==='/users' && req.method==='POST'){
        createUser(req,res);
    }
    else if(req.url.match(/\/users\/([0-9]+)/) && req.method==='PUT'){
        const id=req.url.split('/')[2];
        updateUser(req,res,id);
    }
    else if(req.url.match(/\/users\/([0-9]+)/) && req.method==='DELETE'){
        const id=req.url.split('/')[2];
        deleteUser(req,res,id);
    }
    else{   
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end("404 Page Not Found");
    }
});
server.listen(PORT,()=>{console.log(`Server is running at ${PORT}`)});