let popup = document.querySelector('.popup'); //popup
let profileEditButton = document.querySelector('.profile__edit-button'); // кнопка вызова popup
let popupReset = document.querySelector('.popup__button-reset'); // кнопка закрытия popup
let formElement = document.querySelector('.popup__form'); // форма редактирование имени
let nameImput = formElement.querySelector('.popup__user-name'); // input для ввода имени
let jobInput = formElement.querySelector('.popup__user-about'); // input для описание пользователя
let userName = document.querySelector('.profile__title'); // имя пользователья на странице
let userJob = document.querySelector('.profile__description'); // описание пользователя на странице

/* Функция на открытие и закрытие popup
Не уверен насколько правильно писать управление открытием и закрытием в одной функции
Но все работает и ошибок не выдает
Прошу указать если так делать нельзя */
function popupOpen () {
  if (popup.classList.contains('popup_opened') === false) {
    popup.classList.add('popup_opened');
    nameImput.value = userName.textContent;
    jobInput.value = userJob.textContent;
  } else {
    popup.classList.remove('popup_opened');
  }
}

//Функция на сохранение имени и описания
function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameImput.value;
  userJob.textContent = jobInput.value;
}

profileEditButton.addEventListener('click', popupOpen);
popupReset.addEventListener('click', popupOpen);
formElement.addEventListener('submit', formSubmitHandler);
