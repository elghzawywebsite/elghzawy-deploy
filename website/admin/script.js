let tableBody = document.getElementById('tableBody');
let select = document.getElementById('select');
let newTr = document.createElement('tr')
let newTd = document.createElement('td')

function gradeReform(ele) {
  switch (ele.grade) {
    case "prep1":
      return "الاول الاعدادي";
    case "prep2":
      return "الثاني الاعدادي";
    case "prep3":
      return "الثالث الاعدادي";
    case "sec1":
      return "الاول الثانوي";
    case "sec2s":
      return "الثاني الثانوي (علمي)";
    case "sec2l":
      return "الثاني الثانوي (ادبي)";
    case "sec3":
      return "الثالث الثانوي";
    default:
      return "";
  }
}
let selectBuild = async () => {
  try{
  let response = await fetch("/collectionsNames");
  let collectionsNames = await response.json();
  collectionsNames.forEach((element) => {
  let newOption = document.createElement('option');
  newOption.value = element;
  newOption.textContent = element;
  select.appendChild(newOption);
    });
  }catch(err){
    console.log(err);
    return window.location.href = "/login" ;
  }

}
selectBuild();
   
  
    let buildTable = async (key) => {
      try{
        tableBody.innerHTML = '';
        let response = await fetch(`/applicationData?key=${key}`);
        let applicationData = await response.json();
        applicationData.forEach((element) => {
          
            let tr = document.createElement('tr');
            let studentName = document.createElement('td');
            let grade = document.createElement('td');
            let studentNumber = document.createElement('td');
            let parentNumber = document.createElement('td');
            let time = document.createElement('td');
            studentName.textContent = element.studentName;
            grade.textContent = gradeReform(element);
            studentNumber.textContent = element.studentNumber;
            parentNumber.textContent = element.parentNumber;
            time.textContent = element.time;
  
            tr.append(...[studentName, grade, studentNumber, parentNumber, time]);
            tableBody.appendChild(tr);
      
        });
        
      }catch(err){
    console.log(err);
    return window.location.href = "/login" ;
  }
    };
select.addEventListener('input', (e) => {
buildTable(e.target.value)
}
);

