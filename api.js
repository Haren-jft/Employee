function employees() {  
  this.getAll=()=>{
    const res=$.ajax({
        type:'GET',
        dataType:'json',
        contentType:'application/json',
        url:'http://localhost:3000/users',
    });
    return res;
  };
  this.post=(emp)=>{
    const res=$.ajax({
        type:"POST",
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
        dataType:'json',
        contentType:"application/json",
        url:`http://localhost:3000/users/${id}`,
    });
  };
  this.put=(emp,id)=>{
    const res=$.ajax({
        type:"PUT",
        dataType:'json',
        contentType:"application/json",
        url:`http://localhost:3000/users/${id}`,
        data:JSON.stringify(emp)
    });
    return res;
  };
}
