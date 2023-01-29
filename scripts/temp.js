const showInputError = (form, input, errorMessage, set) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(set.inputErrorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (form, input, set) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(set.inputErrorClass);
  errorElement.textContent = '';
}

const isValid = (form, input, set) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, set);
  } else {
    hideInputError(form, input, set);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, set) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(set.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(set.inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  };
};

const setEventListeners = (form, set) => {
  const inputList = Array.from(form.querySelectorAll(set.inputSelector));
  const buttonElement = form.querySelector(set.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, set);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, set);
      toggleButtonState(inputList, buttonElement, set);
    });
  });
};

const enableValidation = (set) => {
  const formList = Array.from(document.querySelectorAll(set.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, set);
  });
};

enableValidation(validationSettings);