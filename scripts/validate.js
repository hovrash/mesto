const validationSettings = {
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__save-btn',
  inactiveButtonClass: 'input__save-btn_inactive',
  inputErrorClass: 'input__text_type_error'
}

class FormValidator {
  constructor(set, form) {
    this._formSelector = set.formSelector;
    this._inputSelector = set.inputSelector;
    this._submitButtonSelector = set.submitButtonSelector;
    this._inactiveButtonClass = set.inactiveButtonClass;
    this._inputErrorClass = set.inputErrorClass;
    this._form = form;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else { 
      this._submitButton.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    };
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners()
  }
}

const formList = Array.from(document.querySelectorAll('.input'));
formList.forEach((form) => {
  const newElement = new FormValidator(validationSettings, form);
  newElement.enableValidation();
})