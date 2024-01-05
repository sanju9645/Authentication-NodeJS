
document.addEventListener('DOMContentLoaded', function () {
  const emailInput    = document.getElementById('login_email_field');
  const passwordInput = document.getElementById('login_password_field');
  const signInButton  = document.getElementById('sign_in_button');


  const validateEmailInput = () => {
    const inputValue = emailInput.value.trim();
    // Check if the entered text is a valid email
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);

    return isValidEmail;
  }

  const updateSignInButton = () => {
    const emailValue    = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    let buttonEnable = false;
    buttonEnable     = (validateEmailInput() && emailValue !== '') && passwordValue !== '';

    if (buttonEnable) {
      signInButton.classList.remove('pointer-events-none');
    } else {
      signInButton.classList.add('pointer-events-none');
    }
  };
  
  emailInput.addEventListener('input', function () {
    const isValidEmail = validateEmailInput();

    // Apply styles based on email validity
    if (isValidEmail) {
      emailInput.classList.add('border-gray-300', 'focus:border-green-400');
      emailInput.classList.remove('border-red-400', 'focus:border-red-400');
      updateSignInButton();
    } else {
      emailInput.classList.add('border-red-400', 'focus:border-red-400');
      emailInput.classList.remove('border-gray-300', 'focus:border-green-400');
    }
  });

  passwordInput.addEventListener('input', updateSignInButton);
});



