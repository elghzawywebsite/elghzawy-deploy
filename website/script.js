/* -------------------------------------------------------------------------------------------*/

// Define the text to be typed
var textToType = "مهندس/ محمود الغزاوي";
var typingDelay = 100; // Delay between each character typing
var repeatDelay = 10000; // Delay before repeating the typing effect (in milliseconds)

// Get the typing text element
var typingTextElement = document.getElementById("typing-text");

// Function to start the typing animation
function startTypingAnimation() {
  var currentCharacterIndex = 0;
  var intervalId = setInterval(function() {
    if (currentCharacterIndex < textToType.length) {
      var currentText = textToType.slice(0, currentCharacterIndex + 1);
      typingTextElement.innerHTML = currentText;
      currentCharacterIndex++;
    } else {
      clearInterval(intervalId);
      setTimeout(startTypingAnimation, repeatDelay); // Start the typing animation again after the repeat delay
    }
  }, typingDelay);
}

// Start the typing animation when the page loads
window.addEventListener("load", startTypingAnimation);

/* ---------------------------------------------------------------------------------------------*/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar-list");
hamburger.addEventListener("click",() => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
const navLink = document.querySelectorAll(".navIcons").forEach(n => n.addEventListener("click",()=>{
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}));
/*-----------------------------------------------------------------------------------------------------------*/

