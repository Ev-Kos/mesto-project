//Функция показа ошибки

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Функция скрытия ошибки
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Проверка на валидность
function validate(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

//Обработчик каждого инпута
function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputArr = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputArr, buttonElement, inactiveButtonClass);

  inputArr.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validate(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputArr, buttonElement, inactiveButtonClass);
    });
  });
};

//Поиск невалидного инпута
function hasInvalidInput(inputArr) {
  return inputArr.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Переключение кнопки "сохранить"

function toggleButtonState(inputArr, buttonElement, inactiveButtonClass)  {
  if (hasInvalidInput(inputArr)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//Обработчик каждой формы
export default function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const formArr = Array.from(document.querySelectorAll(formSelector));
  formArr.forEach(formElement => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}
