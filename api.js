function employees() { 
  let token=sessionStorage.getItem('token');
  this.registerUser=(user)=>{
    const res=$.ajax({
      type:'POST',
      dataType:'json',
      contentType:'application/json',
      url:'http://localhost:3000/api/register',
      data:JSON.stringify(user)
  });
  return res;
  } 
  this.loginUser=(user)=>{
    const token=$.ajax({
      type:'POST',
      dataType:'json',
      contentType:'application/json',
      url:'http://localhost:3000/api/login',
      data:JSON.stringify(user)
  });
  return token;
  } 
  this.getAll=()=>{
    const res=$.ajax({
        type:'GET',
        headers:{authorization:`Bearer ${token}`},
        dataType:'json',
        contentType:'application/json',
        url:'http://localhost:3000/users',
    });
    return res;
  };
  this.post=(emp)=>{
    const res=$.ajax({
        type:"POST",
        headers:{authorization:`Bearer ${token}`},
        dataType:'json',
        contentType:"application/json",
        url:'http://localhost:3000/users',
        data: JSON.stringify(emp)
    });
    return res;
  };
  this.delete=(id)=>{
    $.ajax({
        type:"DELETE",
        headers:{authorization:`Bearer ${token}`},
        dataType:'json',
        contentType:"application/json",
        url:`http://localhost:3000/users/${id}`,
    });
  };
  this.put=(emp,id)=>{
    const res=$.ajax({
        type:"PUT",
        headers:{authorization:`Bearer ${token}`},
        dataType:'json',
        contentType:"application/json",
        url:`http://localhost:3000/users/${id}`,
        data:JSON.stringify(emp)
    });
    return res;
  };
}
