let api=new employees();
async function register(){
    let user={
        "email":document.getElementById("em").value,
        "password":document.getElementById("pass").value
    }
    user=await api.registerUser(user);
    if(!user){
        console.log('Error in registering a user')
    }
    else{
        alert('USER REGISTERED SUCCESSFULLY');
    }
}