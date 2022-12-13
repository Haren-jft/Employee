let api=new employees();
async function login(){
    let user={
        "email":document.getElementById("em").value,
        "password":document.getElementById("pass").value
    }
    const jwt_string=await api.loginUser(user);
    if(!jwt_string){
        alert('USER NOT FOUND')
    }
    else{
        sessionStorage.setItem('token',jwt_string.token);
        location.href='index.html';
    }
}