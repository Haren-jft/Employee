let api = new employees();let selectedRow;
async function save() { 
  let Emp = getData(); //returns emp object
  let emp=await api.post(Emp);
    let new_row = $('#tab')[0].insertRow($('#tab')[0].length);
    new_row.id = emp.id;
    let nam_cell = new_row.insertCell(0);
    nam_cell.innerHTML = emp.name;
    let job_cell = new_row.insertCell(1);
    job_cell.innerHTML = emp.job;
    let salary_cell = new_row.insertCell(2);
    salary_cell.innerHTML = emp.salary;
    let actions = new_row.insertCell(3);
    actions.innerHTML =
    "<button onclick='edit(this.parentElement.parentElement)'>Edit</button><button onclick='del(this.parentElement.parentElement)'>Delete</button>"; 
}
async function showData(){
  $('#upd').hide();
  let arr=await api.getAll();
  console.log(arr);
  if(arr!=null){
    for(let i=0;i<arr.length;i++){
      let new_row = $('#tab')[0].insertRow(i);
      new_row.id = arr[i].id;
      let nam_cell = new_row.insertCell(0);
      nam_cell.innerHTML = arr[i].name;
      let job_cell = new_row.insertCell(1);
      job_cell.innerHTML = arr[i].job;
      let salary_cell = new_row.insertCell(2);
      salary_cell.innerHTML = arr[i].salary;
      let actions = new_row.insertCell(3);
      actions.innerHTML =
      "<button onclick='edit(this.parentElement.parentElement)'>Edit</button><button onclick='del(this.parentElement.parentElement)'>Delete</button>";
    }
  }
}
async function update(){
  $('#upd').hide();$('#add').show();
  let obj=await api.put({name: $('#name').val(),job: $('#job').val(),salary: $('#salary').val()}, $('#empid').val());
  selectedRow.cells[0].innerHTML=obj.name;
  selectedRow.cells[1].innerHTML=obj.job;
  selectedRow.cells[2].innerHTML=obj.salary;
}
function edit(row){
  selectedRow=row;
  $('#upd').show();$('#add').hide();
  $('#name')[0].value=selectedRow.cells[0].innerHTML;
  $('#job')[0].value=selectedRow.cells[1].innerHTML;
  $('#salary')[0].value=selectedRow.cells[2].innerHTML;
  $('#empid')[0].value = selectedRow.id;
}
async function del(row) {
  await api.delete(row.id);
  $('#tab')[0].deleteRow(row.rowIndex-1);
}
function getData() {return {name: $('#name').val(),job: $('#job').val(),salary: $('#salary').val()};}