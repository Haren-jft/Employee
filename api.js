function employees(){
    // this.emps=[];
    // this.post=(emp)=>{
    //     let p=new Promise((resolve,reject)=>{
    //         setTimeout(()=>{
    //             let arr=JSON.parse(localStorage.getItem('employees'));
    //             if(arr!=null){
    //                 this.emps=[];
    //                 for(let i=0;i<arr.length;i++){
    //                     this.emps.push(arr[i]);
    //                 }
    //             }
    //             emp.id=parseInt(localStorage.getItem('uid'));
    //             localStorage.setItem('uid',''+(parseInt(localStorage.getItem('uid'))+1));    
    //             this.emps.push(emp);
    //             localStorage.setItem('employees',JSON.stringify(this.emps));
    //             resolve(emp);
    //         },2000);
    //     });
    //     return p;
    // }
    this.getAll=async ()=>{
        try{
            const res=await fetch('http://localhost:3000/users',{
                method:"GET",
            })
            return res.json();
            }catch(err){
                console.log(err);
            }
    }
    this.post=async (emp)=>{
        try{
        const res=await fetch('http://localhost:3000/users',{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(emp)
        })
        return res.json();
        }catch(err){
            console.log(err);
        }
    }
    // this.delete=(id)=>{
    //     let p=new Promise((resolve,reject)=>{
    //         setTimeout(()=>{
    //             this.emps=JSON.parse(localStorage.getItem('employees'));
    //             let idx=this.emps.findIndex((emp)=>emp.id==id);
    //             this.emps.splice(idx,1);
    //             localStorage.setItem('employees',JSON.stringify(this.emps));
    //             console.log(this.emps);
    //             resolve();
    //         },2000);
    //     });
    //     return p;
    // }

    this.delete=async (id)=>{
        try{
        await fetch(`http://localhost:3000/users/${id}`,{
            method:"DELETE",
            headers:{
                Accept:"application/json",
            },
        })
        }catch(err){
            console.log(err);
        }
    }

    // this.put=function(obj, id){
    //     let p=new Promise((resolve,reject)=>{
    //         setTimeout(()=>{
    //             this.emps=JSON.parse(localStorage.getItem('employees'));
    //             const objog = this.emps.find(emp => emp.id == id)
    //             objog.name = obj.name;
    //             objog.job = obj.job;
    //             objog.salary = obj.salary;
    //             localStorage.setItem('employees',JSON.stringify(this.emps));
    //             console.log(this.emps);
    //             resolve(objog);
    //         },2000);
    //     });
    //     return p;
    // };
    this.put=async (obj,id)=>{
        try{
            const res=await fetch(`http://localhost:3000/users/${id}`,{
                method:"PUT",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(obj)
            })
            return res.json();
            }catch(err){
                console.log(err);
            }        
    }
}








