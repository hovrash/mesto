const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add('input__text_type_error');
  errorElement.textContent = errorMessage;
}

const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove('input__text_type_error');
  errorElement.textContent = '';
}


const isValid = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.input__text'));
  const buttonElement = form.querySelector('.input__save-btn');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
    isValid(form, input);
    toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.input'));
  formList.forEach((form) => {
    setEventListeners(form);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('input__save-btn_inactive');
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove('input__save-btn_inactive');
    buttonElement.removeAttribute('disabled')
  };
};

enableValidation();