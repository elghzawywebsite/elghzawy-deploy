const secondSelectOptions = {
  prep1: ["( الحكماء )( الساعة ٦ )( الاحد )"],

  prep2: ["( الحكماء )( الساعة ٧ )( الاحد )"],

  prep3: ["الحكماء)( الساعة ١ )( الاحد ))",
   "( المنشية )( الساعة ١ )( السبت )"],

  sec1: [
    "( الحكماء )( الساعة ٧ )( السبت )",
    "( المنشية )( الساعة ٤ )( السبت )",
    "( القومية )( الساعة ٤ )( الاحد )"
  ],
  sec2s: [
    "( الحكماء )(الساعة ٦ )( السبت )",
    "( المنشية )( الساعة ٥ )( السبت )",
    "( القومية )( الساعة ٥ )( الاحد )"
  ],
  sec2l: [
    "( الحكماء )(الساعة ٦ )( السبت )",
    "( المنشية )( الساعة ٥ )( السبت )",
    "( القومية )( الساعة ٥ )( الاحد )"
  ],
  sec3: ["( القومية )( الساعة ٧ )( يوميا )",
"( الحكماء )( الساعة ٢ )(يوميا )"]
};


  const firstSelect = document.getElementById("grade");
  const secondSelect = document.getElementById("time");

  firstSelect.addEventListener("change", function () {
    let value = firstSelect.value;
    let firstSelectOption = secondSelectOptions[value];
    let options = '<option value="" selected disabled>اختر الميعاد</option>'

    firstSelectOption.forEach((element) => {
     options += `<option>${element}</option>`

    });
    secondSelect.innerHTML = options ;
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

 /*------------------------------------------------------------------------------------------------------------------------------*/
let dispApp = async()=>{
 const request =await fetch('/applications-ghzawy')
 try{
    const allData = await request.json();
    
    }
    catch(error){
        console.log("error",error);
        
    }
 
  };
dispApp();
