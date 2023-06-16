/* -------------------------------------------------------------------------------------------*/

const inputs = document.querySelectorAll('input')
inputs.forEach((input) => {
  
    input.addEventListener('invalid', function() {
        input.setCustomValidity('الرجاء ملئ هذا المدخل');
    });
  
    input.addEventListener('input', function() {
      input.setCustomValidity('');
    });
 
});


/* ---------------------------------------------------------------------------------------------*/

