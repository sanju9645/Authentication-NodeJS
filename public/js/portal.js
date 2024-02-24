
document.addEventListener('DOMContentLoaded', () => {
  const invalidEmailNote = "This email is on strike, demanding a better address!";
  const invalidPasswordNote = "Oh dear, your password is playing hide and seek!";
  const invalidEmailAndPasswordNote = "Error 42: Humor not recognized";
  const invalidConfirmPasswordNote = "Passwords on a break, let's reunite them! 💔";
  const invalidNmeNote = "No name? Even superheroes have one! 🦸‍♂️";
  const invalidDobNote = "Blank date of birth? Time-traveler or alien?";

  const emailInput    = document.getElementById('login_email_field');
  const passwordInput = document.getElementById('login_password_field');
  const confirmPasswordInput = document.getElementById('confirm_password_field');
  const nameInput     = document.getElementById('register_full_name');
  const dobInput      = document.getElementById('register_dob');
  const signInButton  = document.getElementById('portal_signin_button');
  const signUpButton  = document.getElementById('portal_signup_button');
  const userPortalForm = document.getElementById("userPortalForm");
  
  const inputCheckNotNull = (inputField) => {
    if (inputField) {
      const inputValue = inputField.value.trim();
      const isValidInput = inputValue !== '';

      return isValidInput;
    }
    return true;
  }

  const handleInputField = (inputField, isValid = false) => {
    if (isValid) {
      inputField.classList.add('border-gray-300', 'focus:border-green-400');
      inputField.classList.remove('border-red-400', 'focus:border-red-400');
    } else {
      inputField.classList.add('border-red-400', 'focus:border-red-400');
      inputField.classList.remove('border-gray-300', 'focus:border-green-400');
    }
    updateSignInButton();
    updateSignUpButton();
  }

  const validateEmailInput = () => {
    const emailValue   = emailInput.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) && emailValue !== '';

    return isValidEmail;
  }

  const validatePasswordInput = () => {
    const formAction = userPortalForm.getAttribute('class');

    if ((formAction == 'password-reset-req-form') && passwordInput === null) {
      return true;
    }
    return inputCheckNotNull(passwordInput);
  }

  const handleConfirmPasswordValidation = () => {
    handleInputField(confirmPasswordInput, false);
    handleInputField(confirmPasswordInput, validateConfirmPasswordInput());
  }

  const validateConfirmPasswordInput = () => { 
    if (passwordInput && confirmPasswordInput) {
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      if (inputCheckNotNull(passwordInput) && inputCheckNotNull(confirmPasswordInput) && (password === confirmPassword)) {
        return true;
      }
      return false;
    }
    return true;
  }

  const validateNameInput = () => {
    return inputCheckNotNull(nameInput);
  }

  const validateDobInput = () => {
    return true;

    const dob = dobInput.value.trim();
    const selectedDate = new Date(dob);
    const currentDate  = new Date();


    if (inputCheckNotNull(dobInput)) {
      return false;
    }

    if (isNaN(selectedDate.getTime())) {
      return false;
    }

    if (selectedDate > currentDate) {
      return false;
    }

    return true;
  }

  const updateSignInButton = () => {
    let buttonEnable = validateEmailInput() && validatePasswordInput();

    if (signInButton) {
      if (buttonEnable) {
        signInButton.classList.remove('pointer-events-none');
      } else {
        signInButton.classList.add('pointer-events-none');
      }
    }
  };

  const updateSignUpButton = () => {
    let buttonEnable = validateEmailInput() && validatePasswordInput() && validateConfirmPasswordInput() && validateNameInput() && validateDobInput();

    if (signUpButton) {
      if (buttonEnable) {
        signUpButton.classList.remove('pointer-events-none');
      } else {
        signUpButton.classList.add('pointer-events-none');
      }
    }
  };

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      handleInputField(emailInput, validateEmailInput());
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      handleInputField(passwordInput, validatePasswordInput());

      if (confirmPasswordInput) {
        handleConfirmPasswordValidation();
      }
    });
  }

  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', () => {
      handleConfirmPasswordValidation();
    });
  }

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      handleInputField(nameInput, validateNameInput());
    });
  }

  if (dobInput) {
    dobInput.addEventListener('change', () => {
      handleInputField(dobInput, validateDobInput());
    });
  }
  
  if (signInButton) {
    signInButton.addEventListener('click', () => {
      closeToast('portal-toast-danger');

      if (validateEmailInput() && !validatePasswordInput()) {
        displayToast('portal-toast-danger', invalidPasswordNote);
      } else if (!validateEmailInput() && validatePasswordInput()) {
        displayToast('portal-toast-danger', invalidEmailNote);
      } else if (!validateEmailInput() && !validatePasswordInput()) {
        displayToast('portal-toast-danger', invalidEmailAndPasswordNote);
      } else {
        closeToast('portal-toast-danger');
        userPortalForm.submit();
      }
    });
  }

  if (signUpButton) {
    signUpButton.addEventListener('click', () => {
      closeToast('portal-toast-danger');

      if (!validateEmailInput()) {
        displayToast('portal-toast-danger', invalidEmailNote);
      } else if (!validatePasswordInput()) {
        displayToast('portal-toast-danger', invalidPasswordNote);
      } else if (!validateConfirmPasswordInput()) {
        displayToast('portal-toast-danger', invalidConfirmPasswordNote);
      } else if (!validateNameInput()) {
        displayToast('portal-toast-danger', invalidNmeNote);
      } else if (!validateDobInput()) {
        displayToast('portal-toast-danger', invalidDobNote);
      } else {
        closeToast('portal-toast-danger');
        userPortalForm.submit();
      }
    }); 
  }
});



