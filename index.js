
document.addEventListener('DOMContentLoaded', function() {
  const form=document.getElementById("stu-form");
  const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0]
  const submitButton = document.getElementById('butn');
  loadLocalStorage();
    submitButton.addEventListener("click", copyDetails);
    function copyDetails(e) {
     e.preventDefault();
      const name = document.getElementById('sname').value;
      const id = document.getElementById('sid').value;
      const className = document.getElementById('cname').value;
      const mail = document.getElementById('email').value;
      const phoneNumber = document.getElementById('num').value;
    //   console.log(name);
    if(!name || !id || !className ||!mail || !phoneNumber){
      alert('please fill out all fields');
      return;
    }
    addStudentToTable(name,id,className,mail,phoneNumber);
   
    saveToLocalStorage();
    form.reset();
    }
  function addStudentToTable(name, id, className,mail,phoneNumber) {
    const row = studentTable.insertRow();
    row.insertCell().textContent=name;
    row.insertCell().textContent=id;
    row.insertCell().textContent=className;
    row.insertCell().textContent=mail;
    row.insertCell().textContent=phoneNumber;
    const actionsCell = row.insertCell();
    actionsCell.innerHTML = `
        <button onclick="editRecord(this)">Edit</button>
        <button onclick="deleteRecord(this)">Delete</button>
    `;
  }
  function saveToLocalStorage(){
    const rows=studentTable.rows;
    const students=[];
    for(let i=0;i<rows.length;i++){
      const cells=rows[i].cells;
       students.push({
        name:cells[0].textContent,
        id:cells[1].textContent,
        className:cells[2].textContent,
        mail:cells[3].textContent,
        phoneNumber:cells[4].textContent
       });
    }
    localStorage.setItem('students',JSON.stringify(students));//setItem used to set value in localStorage
  }
  function loadLocalStorage() {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    students.forEach(student => {
        addStudentToTable(student.name, student.id, student.className,student.mail,student.phoneNumber);
    });
}
window.editRecord=function(button){
  const row = button.closest('tr');
document.getElementById('sname').value=row.cells[0].textContent;
document.getElementById('sid').value=row.cells[1].textContent;
document.getElementById('cname').value=row.cells[2].textContent;
document.getElementById('email').value=row.cells[3].textContent;
document.getElementById('num').value=row.cells[4].textContent;
studentTable.deleteRow(row.rowIndex-1);
saveToLocalStorage();
}
window.deleteRecord=function(button){
  const row=button.closest('tr');
  studentTable.deleteRow(row.rowIndex -1); 
  saveToLocalStorage();
}

});