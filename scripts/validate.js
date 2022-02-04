const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Функция проверки валидности
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Функция установки слушателей на все внутри таблицы
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  // Проверим состояние кнопки в начале и меняем ее состояние
  toggleButtonState(inputList, buttonElement, config);

  // Повесим слушателя на каждый input из массива inputList для проверки валидности
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      // Проверяем кнопку при изменении input
      toggleButtonState(inputList, buttonElement, config);

    });
  });
};

// Функция включения валидации
const enableValidation = (config) => {
  // Получим массив всех форм на странице
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // Переберем массив для получения каждой формы, повесим слушателя для отмены стандартной отправки формы
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    // Получим массив всех fieldset на странице и будем отслеживать их
    const fieldsetList = Array.from(document.querySelectorAll('.popup__fieldset'));
    fieldsetList.forEach(function (fieldset) {
      setEventListeners(fieldset, config);
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
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Вызов функции включения валидации на странице
enableValidation(validationConfig);
