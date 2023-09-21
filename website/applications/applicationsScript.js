 let secondSelectOptions ;
window.onload = async ()=>{
  try{
  const response = await fetch('/dates');
  secondSelectOptions = await response.json();
  }catch(err){
    console.log(err);
    return window.location.href = "/submits/faild.html" ;
  }
  };

  const firstSelect = document.getElementById("grade");
  const secondSelect = document.getElementById("time");

  firstSelect.addEventListener("change", async () => {
    try{
      let value = await firstSelect.value;
      let firstSelectOption = await secondSelectOptions[value];
      let options = '<option value="" selected disabled>اختر الميعاد</option>' ;
  
      firstSelectOption.forEach((element) => {
       options += `<option>${element}</option>`
  
      });
      secondSelect.innerHTML = options ;
    }catch(err){
      console.log(err);
      return window.location.href = "/submits/faild.html" ;
    }

  });


 /*------------------------------------------------------------------------------------------------------------------------------*/
const inputs = document.querySelectorAll('input');
const selects = document.querySelectorAll('select');
 // Change the validation error message for each input element
 function validation(element){
  element.forEach(function(input) {
    input.addEventListener('invalid', function() {
        input.setCustomValidity('الرجاء ملئ هذا المدخل');
    });
  
    input.addEventListener('input', function() {
      input.setCustomValidity('');
    });
  });
 };
 validation(inputs);
 validation(selects);

/*----------------------------------------------------------------------*/
const myForm = document.getElementById('myForm');
const studentNameInput = document.getElementById('studentNameInput');
const studentNameValidation = document.getElementById('studentNameValidation');

myForm.addEventListener("submit", (event)=>{
  event.preventDefault();

  let name = studentNameInput.value.trim();
  let nameParts = name.split(' ');
  if (nameParts.length < 3) {
    studentNameValidation.innerText = 'ادخل اسم الطالب ثلاثيا على الأقل.' ;
  }else{
    studentNameValidation.innerText = '' ;
    myForm.submit()
  }
});
studentNameInput.addEventListener('input', function() {
  studentNameValidation.innerText = '' ;
});


