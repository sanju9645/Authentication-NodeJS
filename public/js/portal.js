
document.addEventListener('DOMContentLoaded', () => {
  const invalidEmailNote = "This email is on strike, demanding a better address!";
  const invalidPasswordNote = "Oh dear, your password is playing hide and seek!";
  const invalidEmailAndPasswordNote = "Error 42: Humor not recognized";

  const emailInput    = document.getElementById('login_email_field');
  const passwordInput = document.getElementById('login_password_field');
  const signInButton  = document.getElementById('portal_submit_button');

  const validateEmailInput = () => {
    const emailValue   = emailInput.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) && emailValue !== '';

    return isValidEmail;
  }

  const validatePasswordInput = () => {
    const passwordValue = passwordInput.value.trim();
    let isValidPassword = passwordValue !== '';

    return isValidPassword;
  }

  const updateSignInButton = () => {
    let buttonEnable = validateEmailInput() && validatePasswordInput();

    if (buttonEnable) {
      signInButton.classList.remove('pointer-events-none');
    } else {
      signInButton.classList.add('pointer-events-none');
    }
  };

  const handleInputField = (inputField, isValid = false) => {
    if (isValid) {
      inputField.classList.add('border-gray-300', 'focus:border-green-400');
      inputField.classList.remove('border-red-400', 'focus:border-red-400');
    } else {
      inputField.classList.add('border-red-400', 'focus:border-red-400');
      inputField.classList.remove('border-gray-300', 'focus:border-green-400');
    }
    updateSignInButton();
  }
  
  emailInput.addEventListener('input', () => {
    handleInputField(emailInput, validateEmailInput());
  });

  passwordInput.addEventListener('input', () => {
    handleInputField(passwordInput, validatePasswordInput());
  });

  
  signInButton.addEventListener('click', () => {
    if (validateEmailInput() && !validatePasswordInput()) {
      displayToast('portal-toast-danger', invalidPasswordNote)
    } else if (!validateEmailInput() && validatePasswordInput()) {
      displayToast('portal-toast-danger', invalidEmailNote)
    } else if (!validateEmailInput() && !validatePasswordInput()) {
      displayToast('portal-toast-danger', invalidEmailAndPasswordNote)
    } else {
      closeToast('portal-toast-danger');
    }
  });
});



