// Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Функция проверки валидности
const checkInputValidity = (formElement, inputElement, item) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, item);
  } else {
    hideInputError(formElement, inputElement, item);
  }
};

// Функция установки слушателей на все внутри таблицы
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...item}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // Проверим состояние кнопки в начале и меняем ее состояние
  toggleButtonState(inputList, buttonElement, item);

  // Повесим слушателя на каждый input из массива inputList для проверки валидности
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, item);
      // Проверяем кнопку при изменении input
      toggleButtonState(inputList, buttonElement, item);
    });
  });
};

// Функция включения валидации
const enableValidation = ({formSelector, ...item}) => {
  // Получим массив всех форм на странице
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Переберем массив для получения каждой формы, повесим слушателя для отмены стандартной отправки формы
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    // Получим массив всех fielset на странице и будем отслеживать их
    const fieldsetList = Array.from(document.querySelectorAll('.popup__fieldset'));
    fieldsetList.forEach(function (fieldset) {
      setEventListeners(fieldset, item);
    });
  });
};

// Функция для проверки валидности каждого поля input
const hasInvalidInput = (inputList) => {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};

// Функция для блокировки кнопки Отправить
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// Вызов функции включения валидации на странице
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
