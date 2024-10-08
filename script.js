

                                     // Booking form validation
                  //  -----------------------------------------------------------


    function validatePhone() {
    var phone = document.getElementById("phone").value;
    var errorMessage = document.getElementById("error-message-phone");

    // Check if the phone number is exactly 10 digits
    var phonePattern = /^\d{10}$/;

    if (phonePattern.test(phone)) {
        errorMessage.style.display = "none";
        // Submit form if the phone number is valid
        document.forms[0].submit();
    } else {
        // Show error message if the phone number is not valid
        errorMessage.style.display = "block";
    }
}

             //  -----------------------------------------------------------

                             //  Smooth Scrolling

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.nav-items a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Calculate distance from the top of the page to the target element
          const offsetTop = targetElement.offsetTop;
          
          // Smooth scroll animation
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      });
    });
  });

   //  -----------------------------------------------------------
  