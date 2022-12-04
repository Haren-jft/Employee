const http=require('http');
const { getUsers,getUser,createUser }=require('./controllers/usercontroller');
const PORT=process.env.PORT || 5000;
const server=http.createServer((req,res)=>{
    if(req.url==='/api/users' && req.method==='GET'){
        getUsers(req,res);
    }
    else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method==='GET'){
        const id=req.url.split('/')[3];
        getUser(req,res,id);
    }
    else if(req.url==='/api/users' && req.method==='POST'){
        createUser(req,res);
    }
    else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end("404 Page Not Found");
    }
});
server.listen(PORT,()=>{console.log(`Server is running at ${PORT}`)});