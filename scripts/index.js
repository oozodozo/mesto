import FormValidator from './FormValidator.js';
import Card from './Card.js';

const popupEdit = document.querySelector('.popup_edit-profile'); //popup
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка вызова popup
const popupEditReset = document.querySelector('.popup__edit-reset-button'); // кнопка закрытия popup
const userEditForm = document.querySelector('.popup__form'); // форма редактирование имени
const nameInput = userEditForm.querySelector('.popup__user-name'); // input для ввода имени
const jobInput = userEditForm.querySelector('.popup__user-about'); // input для описания пользователя
const userName = document.querySelector('.profile__title'); // имя пользователя на странице
const userJob = document.querySelector('.profile__description'); // описание пользователя на странице
const popupAddElement = document.querySelector('.popup_add-element'); // popup добавление карточки
const addElementButton = document.querySelector('.profile__add-button'); // кнопка открытия popup с добавлением карточки
const popupAddElementReset = document.querySelector('.popup__reset-add-button'); //  кнопка закрытия popupAdd
const popupAddElementSubmit = document.querySelector('.popup__button-element-submit'); // кнопка сохранения
const popupAddTitleInput = document.querySelector('.popup__place-title'); // поле ввода названия фотографии
const popupAddImageLink = document.querySelector('.popup__image-link'); // поле ввода ссылки на фотографию
const elements = document.querySelector('.elements'); // Блок elements
export const popupZoomImage = document.querySelector('.popup_zoom-image'); // popup с большой фотографией
export const zoomImage = document.querySelector('.popup__image'); // Большая фотография
export const imageFigcaption = document.querySelector('.popup__figcaption'); // Подпись под фотографией
const closedButton = popupZoomImage.querySelector('.popup__reset-button'); // Кнопка закрытия popupZoomImage
const formAddCard = popupAddElement.querySelector('.popup__form'); // Форма popup добавления фотографии

// Объект с классами для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const profileValid = new FormValidator(validationConfig, userEditForm); // Экземпляр класса для формы редактирования профиля
const addCardValid = new FormValidator(validationConfig, formAddCard); // Экземпляр класса для формы добавления карточки

// Массив первых 6-ти карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция закрытия popup по нажатию на ESC
function closePopupKeydownEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция закрытия popup по клику на overlay
function closePopupClickOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// Функция открытия popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',closePopupKeydownEsc); // Слушатель на закрытие по ESC
  popup.addEventListener('click', closePopupClickOverlay); // Слушатель на закрытие по overlay
}

// функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown',closePopupKeydownEsc);
  popup.removeEventListener('click', closePopupClickOverlay);
}

// Функция создания карточки
const createCard = (element) => {
  const elementCard = new Card(element, '#template-element');
  const cardElement = elementCard.generateCard();
  return cardElement;
}

// Функция добавления карточки на страницу в начало
const insertElement = (element) => {
  elements.prepend(createCard(element));
}

// Загрузка 6 карточек из массива
initialCards.forEach((item) => {
  insertElement(item);
});

// Функция получения текста input в форме редактирования
function receivingInputsPopupEdit() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

//Функция на сохранение имени и описания
function handlePopupEditForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Кнопка закрытия popupZoomImage
closedButton.addEventListener('click', function() {
  closePopup(popupZoomImage);
});

// Кнопка открытия popup редактирования профиля
profileEditButton.addEventListener('click', function() {
  profileValid.resetValidation();
  openPopup(popupEdit);
  receivingInputsPopupEdit();
});

// Кнопка закрытия popup редактирования профиля
popupEditReset.addEventListener('click', function() {
  closePopup(popupEdit);
});

// Кнопка сохранения информации о себе
userEditForm.addEventListener('submit', handlePopupEditForm);

// Кнопка открытия popupAddElement
addElementButton.addEventListener('click', function() {
  formAddCard.reset();
  addCardValid.resetValidation();
  openPopup(popupAddElement);
});

// Кнопка закрытия popupAddElement
popupAddElementReset.addEventListener('click', function() {
  closePopup(popupAddElement);
});

// Добавление карточки внутри popupAddElement
popupAddElementSubmit.addEventListener('click', function(evt) {
  evt.preventDefault();
  const cardData = {
    link: popupAddImageLink.value,
    name: popupAddTitleInput.value
  }
  insertElement(cardData);
  closePopup(popupAddElement);
});

// Запуск валидации для формы редактирования профиля
profileValid.enableValidation();

// Запуск валидации для формы добавления карточки
addCardValid.enableValidation();
